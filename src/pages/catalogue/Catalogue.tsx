import React, {useEffect, useState} from 'react';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
} from "@ionic/react";

import Categories from "./Categories";
import Products from "./Products";
import SearchBar from "../../widgets/SearchBar";
import ProductsManager from "../../data/ProductsManager";

function Catalogue() {

    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        ProductsManager.updateQuery(query)
    }, [query]);

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Каталог</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <SearchBar onInputChanged={ input => setQuery(input) }/>
            <PageSelector query={ query } />
        </IonContent>
    </IonPage>
}

const PageSelector: React.FC<{ query: string }> = ({ query }) => {
    if (query.length === 0) {
        return <Categories/>
    } else {
        return <Products categoryId={ null } query={ query }/>
    }
};

export default Catalogue;