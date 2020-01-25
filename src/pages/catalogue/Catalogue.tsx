import React, {useEffect, useState} from 'react';
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
import ProductsManager from "../../data/ProductsManager";

function Catalogue() {

    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(1);
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        ProductsManager.updateQuery(query)
    }, [query]);

    return (<IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Каталог</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
              <IonSearchbar onIonInput={ event => {
                  const src: any = event.srcElement;
                  setQuery(src.value)} }/>
              <Categories onCategorySelected={ categoryId => { setSelectedCategoryId(categoryId)} }/>
              <Products categoryId={selectedCategoryId} query={query}/>
          </IonContent>
        </IonPage>
    );
}

export default Catalogue;