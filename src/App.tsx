import React from 'react';
import Amplify from "aws-amplify";
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
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
import Catalogue from "./pages/catalogue/Catalogue";

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

Amplify.configure(awsconfig);

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/tab0" component={Catalogue} exact={true} />
          <Route path="/basket" component={BasketPage} exact={true} />
          <Route path="/account" component={AccountPage} exact={true} />
          <Route path="/account/profile" component={ProfilePage} />
          <Route path="/" render={() => <Redirect to="/tab0" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab0" href="/tab0">
            <IonIcon icon={list} />
            <IonLabel>Каталог</IonLabel>
          </IonTabButton>
          <IonTabButton tab="basket" href="/basket">
            <IonIcon icon={cart} />
            <IonLabel>Корзина</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/account">
            <IonIcon icon={logIn} />
            <IonLabel>Аккаунт</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
