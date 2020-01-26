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
    IonLabel,
    IonButton,
    IonThumbnail,
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
                        Оплатить <b>{ (basket?.entries || []).map(e => e.product.price * e.quantity).reduce((a, b) => a + b, 0) }</b> BYN
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
                    return <IonItem lines="full" key={`${basketEntry.product.id}${basketEntry.quantity}`}>
                        <IonThumbnail slot="start">
                            <IonImg src={basketEntry.product.imageUrl}/>
                        </IonThumbnail>
                        <IonLabel>
                            <IonLabel>{basketEntry.product.name}</IonLabel>

                        </IonLabel>
                        <IonText>
                            {basketEntry.product.price} x {basketEntry.quantity} = <b>{basketEntry.product.price * basketEntry.quantity}</b> BYN
                        </IonText>
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
