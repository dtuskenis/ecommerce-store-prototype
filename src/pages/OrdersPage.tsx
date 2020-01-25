import React, {useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonTitle,
    IonContent, IonList, IonText, IonItem, IonSpinner
} from '@ionic/react';

import OrdersManager, {Order} from '../data/OrdersManager'

const OrdersPage: React.FC<Array<Order>> = () => {

    const [orders, setOrders] = useState<Array<Order> | null>(null);

    useEffect(() => {
        const subscription = OrdersManager.orders().subscribe(orders => setOrders(orders));
        return () => subscription.unsubscribe()
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/account" />
                    </IonButtons>
                    <IonTitle>История заказов</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <Content orders={ orders }/>
            </IonContent>
        </IonPage>
    );
};

type ContentProps = {
    orders: Array<Order> | null
};

const Content: React.FC<ContentProps> = ({ orders }: ContentProps) => {
    if (orders) {
        return <IonList>
            { orders.map(order => {
                return <IonItem key={ order.id }>
                    <IonText>
                        Заказ №<b>{ order.id }</b>
                    </IonText>
                </IonItem>
            }) }
        </IonList>
    } else {
        return <div className="spin">
            <IonSpinner name="dots"/>
        </div>;
    }
};

export default OrdersPage;
