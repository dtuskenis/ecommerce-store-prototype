import React, {useEffect, useState} from 'react';

import {
    IonButton,
    IonCard,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonImg,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';

import {
    addCircleOutline,
    removeCircleOutline,
    trash,
} from "ionicons/icons";

import "./BasketPage.css"

import BasketManager, {Basket, BasketEntry} from "../data/BasketManager";

const BasketPage: React.FC = () => {

  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    const subscription = BasketManager.basket().subscribe(next => setBasket(next));
    return () => subscription.unsubscribe()
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Корзина</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Content basket={ basket }/>
      </IonContent>
      <Footer basketEntries={ basket?.entries || [] }/>
    </IonPage>
  );
};

const Content: React.FC<{ basket: Basket | null }> = ({ basket }) => {
  if (basket) {
    if (basket.entries.length === 0) {
      return <div className="basket-empty">
        <IonText>В корзине пусто :(</IonText>
      </div>
    } else return <IonList lines="none">
      { basket.entries.map(basketEntry => {
        return <IonCard key={`${basketEntry.product.id}${basketEntry.quantity}`}>
            <IonItem className="basket-entry-title">
                <div>
                    <IonImg className="list-item-image" src={ basketEntry.product.imageUrl } />
                </div>
                <IonText className="basket-entry-title-text">{basketEntry.product.name}></IonText>
            </IonItem>

            <IonItem>
                <IonIcon className="basket-entry-counter-button" icon={removeCircleOutline}
                         onClick={() => BasketManager.decreaseQuantity(basketEntry)}/>

                <IonText className="basket-entry-quantity">{basketEntry.quantity}</IonText>

                <IonIcon className="basket-entry-counter-button" icon={addCircleOutline}
                         onClick={() => BasketManager.increaseQuantity(basketEntry)}/>

                <IonLabel className="basket-entry-price-text">
                    <IonText><b>{ (basketEntry.product.price * basketEntry.quantity).toFixed(2) }</b> BYN</IonText>
                </IonLabel>

                <IonButton className="basket-entry-trash-button" shape="round" fill="clear" size="default" color="medium"
                           onClick={() => BasketManager.remove(basketEntry.product)}>
                    <IonIcon icon={trash}/>
                </IonButton>
            </IonItem>

        </IonCard>
      } ) }
    </IonList>
  } else {
    return <div className="basket-loading">
      <IonSpinner name="dots"/>
    </div>
  }
};

const Footer: React.FC<{ basketEntries: Array<BasketEntry> }> = ({ basketEntries }) => {
    if (basketEntries.length === 0) {
        return <div/>
    } else {
        const price = basketEntries.map(entry => entry.product.price * entry.quantity)
                                   .reduce((entry, anotherEntry) => entry + anotherEntry, 0)
                                   .toFixed(2);
        return <IonFooter>
            <IonToolbar className="basket-summary-container">
                <IonText className="basket-entry-summary">
                    Итого: <b>{ price }</b> BYN
                </IonText>
                <IonButton className="basket-submit" size="default" routerLink="/checkout">
                    Оформить
                </IonButton>
            </IonToolbar>
        </IonFooter>
    }
};

export default BasketPage;
