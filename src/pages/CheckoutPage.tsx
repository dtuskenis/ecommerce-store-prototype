import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSpinner,
    IonList,
    IonFooter,
    IonItem,
    IonText,
    IonButton,
    IonImg,
    IonLoading,
} from '@ionic/react';

import "./CheckoutPage.css"

import BasketManager, {Basket} from "../data/BasketManager";
import OrdersManager from "../data/OrdersManager";
import NavigationController from "../navigation/NavigationController";

const CheckoutPage: React.FC = () => {

    const [isOrdering, setIsOrdering] = useState(false);
    const [basket, setBasket] = useState<Basket | null>(null);

    useEffect(() => {
        const subscription = BasketManager.basket().subscribe(basket => setBasket(basket));
        return () => subscription.unsubscribe();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/basket" />
                    </IonButtons>
                    <IonTitle>Оформление заказа</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <BasketView basket={ basket }/>
            </IonContent>
            <IonFooter  className="footer">
                <IonButton size="default"
                           className="submit"
                           disabled={ !basket || basket.entries.length === 0 || isOrdering }
                           onClick={ () => {
                               if (basket) {
                                   setIsOrdering(true);
                                   OrdersManager.makeOrder(basket.entries).then(() => {
                                       setIsOrdering(false);
                                       NavigationController.navigateToRoot()
                                   }).catch(error => {
                                       setIsOrdering(false);
                                       console.log(error);
                                   })
                               }
                           } }>
                    <IonText>
                        Оплатить <b>{ (basket?.entries || []).map(e => e.product.price * e.quantity).reduce((a, b) => a + b, 0).toFixed(2) }</b> BYN
                    </IonText>
                </IonButton>
            </IonFooter>
            <IonLoading isOpen={ isOrdering } message={'Оплата...'} />
        </IonPage>
    );
};

type BasketViewProps = {
    basket: Basket | null
}

const BasketView: React.FC<BasketViewProps> = ({ basket }: BasketViewProps) => {
    if (basket) {
        return <IonContent>
            <IonList>
                { basket.entries.map(basketEntry => {
                    const price = basketEntry.product.price;
                    const quantity = basketEntry.quantity;
                    return <IonItem lines="full" key={`${basketEntry.product.id}${basketEntry.quantity}`}>
                        <div className="checkout-entry">
                            <IonItem className="basket-entry-title" lines="none">
                                <div>
                                    <IonImg className="list-item-image" src={ basketEntry.product.imageUrl } />
                                </div>
                                <IonText className="basket-entry-title-text">{basketEntry.product.name}></IonText>
                            </IonItem>
                            <IonText className="checkout-entry-price">
                                {price} x {quantity} = <b>{ (price * quantity).toFixed(2) }</b> BYN
                            </IonText>
                        </div>
                    </IonItem>
                } ) }
            </IonList>
        </IonContent>
    } else {
        return <div className="spin">
            <IonSpinner name="dots"/>
        </div>;
    }
};

export default CheckoutPage;
