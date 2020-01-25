import React, {useState} from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonPage,
} from "@ionic/react";

import Categories from "./Categories";
import Products from "./Products";

function Catalogue() {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);

    return (<IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Каталог</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
              <IonSearchbar/>
              <Categories onCategorySelected={ categoryId => { setSelectedCategoryId(categoryId)} }/>
              <Products categoryId={selectedCategoryId}/>
          </IonContent>
        </IonPage>
    );
}

export default Catalogue;