import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  IonButton,
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
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import {trash} from "ionicons/icons";

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
      return <div className="empty">
        <IonText>В корзине пусто :(</IonText>
      </div>
    } else return <IonList lines="none">
      { basket.entries.map(basketEntry => {
        return <IonItem lines="full" key={`${basketEntry.product.id}${basketEntry.quantity}`}>
          <IonThumbnail slot="start">
            <IonImg src={basketEntry.product.imageUrl}/>
          </IonThumbnail>
          <IonLabel>
            <IonLabel>{basketEntry.product.name}</IonLabel>

            <IonItem className="counterContainer">
              <CounterButton text="—" onClick={() => BasketManager.decreaseQuantity(basketEntry)}/>
              <IonText className="counterText">{basketEntry.quantity}</IonText>
              <CounterButton text="+" onClick={() => BasketManager.increaseQuantity(basketEntry)}/>
            </IonItem>

          </IonLabel>

          <IonText>
            {basketEntry.product.price} x {basketEntry.quantity} = <b>{basketEntry.product.price * basketEntry.quantity}</b> BYN
          </IonText>

          <IonButton shape="round" fill="clear" size="default" color="medium"
                     onClick={() => BasketManager.remove(basketEntry.product)}>
            <IonIcon icon={trash}/>
          </IonButton>
        </IonItem>
      } ) }
    </IonList>
  } else {
    return <div className="loading">
      <IonSpinner name="dots"/>
    </div>
  }
};

const Footer: React.FC<{ basketEntries: Array<BasketEntry> }> = ({ basketEntries }) => {
  if (basketEntries.length === 0) {
    return <div/>
  } else {
    return <IonFooter >
      <IonItem>
        <IonToolbar>
          <IonText className="summaryText">
            Итого: <b>{ basketEntries.map(e => e.product.price * e.quantity).reduce((a, b) => a + b, 0) }</b> BYN
          </IonText>
        </IonToolbar>
        <IonLabel/>
        <IonButton size="default" routerLink="/checkout">
          Оформить заказ
        </IonButton>
      </IonItem>
    </IonFooter>
  }
};

const CounterButton: FunctionComponent<{ text: string, onClick: () => void }> = ({ text, onClick }) => {
  return <IonButton className="counterButton"
                    shape="round"
                    fill="outline"
                    color="medium"
                    onClick={ () => onClick() }>
    {text}
  </IonButton>
};

export default BasketPage;
