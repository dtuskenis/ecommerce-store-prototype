import React, {useEffect, useState} from 'react';

import {RouteComponentProps} from "react-router";

import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonPage, IonButtons, IonBackButton,
} from "@ionic/react";

import Products from "./Products";

import CatalogueManager from "../../data/CatalogueManager";
import SearchBar from "../../widgets/SearchBar";

const Category: React.FC<RouteComponentProps<{ id: string }>> = (props) => {

    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        CatalogueManager.updateQuery(query);
    }, [query]);

    return <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/catalogue" />
                </IonButtons>
                <IonTitle>Каталог</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
            <SearchBar onInputChanged={ input => setQuery(input) }/>
            <Products categoryId={ parseInt(props.match.params.id) } query={ query }/>
        </IonContent>
    </IonPage>
};

export default Category;