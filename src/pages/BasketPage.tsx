import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  IonButton,
  IonContent, IonFooter,
  IonHeader,
  IonIcon, IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonText, IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import BasketManager, {Basket} from "../data/BasketManager";
import {trash} from "ionicons/icons";
import "./BasketPage.css"

const BasketPage: React.FC = () => {

  const [basket, setBasket] = useState(new Basket([]));

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
        <IonList lines="none">
          { basket.entries.map(basketEntry =>

              <IonItem lines="full" key={ `${basketEntry.product.id}${basketEntry.quantity}` }>
                <IonThumbnail slot="start">
                  <IonImg src={ basketEntry.product.imageUrl } />
                </IonThumbnail>
                <IonLabel>
                  <IonLabel>{ basketEntry.product.name }</IonLabel>

                  <IonItem className="counterContainer">
                    <CounterButton text="—" onClick={ () => BasketManager.decreaseQuantity(basketEntry) }/>
                    <IonText className="counterText">{ basketEntry.quantity }</IonText>
                    <CounterButton text="+" onClick={ () => BasketManager.increaseQuantity(basketEntry) }/>
                  </IonItem>

                </IonLabel>

                <IonText>
                  { basketEntry.product.price } x { basketEntry.quantity } = <b>{ basketEntry.product.price * basketEntry.quantity }</b> BYN
                </IonText>

                <IonButton shape="round" fill="clear" size="default" color="medium" onClick={ () => BasketManager.remove(basketEntry.product) }>
                  <IonIcon icon={trash} />
                </IonButton>
              </IonItem>

          ) }
        </IonList>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonText className="summaryText">
            Итого: <b>{ basket.entries.map(e => e.product.price * e.quantity).reduce((a, b) => a + b, 0) }</b> BYN
          </IonText>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

type CounterButtonProps = {
  text: string
  onClick: () => void
}

const CounterButton: FunctionComponent<CounterButtonProps> = ({ text, onClick }: CounterButtonProps) => {
  return <IonButton className="counterButton"
                    shape="round"
                    fill="outline"
                    color="medium"
                    onClick={ () => onClick() }>
    {text}
  </IonButton>
};

export default BasketPage;
