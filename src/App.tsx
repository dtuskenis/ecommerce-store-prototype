import React, {useEffect, useState} from 'react';
import Amplify from "aws-amplify";
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp, IonBadge,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cart, list, logIn } from 'ionicons/icons';

import AccountPage from './pages/AccountPage';
import BasketPage from './pages/BasketPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import Catalogue from "./pages/catalogue/Catalogue";
import CheckoutPage from "./pages/CheckoutPage";
import BasketManager from "./data/BasketManager";
import Push from './push/Push';

import awsconfig from './aws-exports';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Category from "./pages/catalogue/Category";

Amplify.configure(awsconfig);

const App: React.FC = () => {
    useEffect(() => {
      Push.register();
    }, []);
    return <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/checkout" component={CheckoutPage}/>
          <Route path="/catalogue/:id" component={Category} />
          <Route path="/" component={Tabs}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
};

const Tabs: React.FC = () => (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/catalogue" component={Catalogue} exact={true} />
        <Route path="/basket" component={BasketPage} exact={true} />
        <Route path="/account" component={AccountPage} exact={true} />
        <Route path="/account/profile" component={ProfilePage} />
        <Route path="/account/orders" component={OrdersPage} />
        <Route path="/" render={() => <Redirect to="/catalogue" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="catalogue" href="/catalogue">
          <IonIcon icon={list} />
          <IonLabel>Каталог</IonLabel>
        </IonTabButton>
        <IonTabButton tab="basket" href="/basket">
          <IonIcon icon={cart} />
          <IonLabel>Корзина</IonLabel>
          <BasketLengthBadge/>
        </IonTabButton>
        <IonTabButton tab="account" href="/account">
          <IonIcon icon={logIn} />
          <IonLabel>Аккаунт</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
);

const BasketLengthBadge: React.FC = () => {
    const [basketLength, setBasketLength] = useState<number>(0);

    useEffect(() => {
        const subscription = BasketManager.basket().subscribe(basket => setBasketLength(basket?.entries.length || 0))
        return () => subscription.unsubscribe()
    }, []);

    if (basketLength > 0) {
        return <IonBadge color="danger">{basketLength}</IonBadge>
    } else {
        return <div/>
    }
};

export default App;
