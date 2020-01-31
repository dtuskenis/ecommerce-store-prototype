import React, {useEffect, useState} from "react";
import {
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonSpinner,
} from "@ionic/react";

import {arrowForward} from "ionicons/icons";

import "./Categories.css"

import Category from "../../data/Category";
import CatalogueManager from "../../data/CatalogueManager";

const Categories: React.FC = () => {

    const [categories, setCategories] = useState<Array<Category> | null>(null);

    useEffect(() =>  {
        const subscription = CatalogueManager.categories.subscribe(categories => setCategories(categories));
        return () => subscription.unsubscribe()
    }, []);

    return <Content categories={ categories }/>;
};

const Content: React.FC<{ categories: Array<Category> | null }> = ({ categories }) => {
    if (categories) {
        return <IonList lines="full">
            { categories.map((category) => (
                <IonItem key={ category.id }
                         detail={ false }
                         routerLink={ "catalogue/" + category.id }>
                    <IonLabel>{ category.name }</IonLabel>
                    <IonIcon icon={ arrowForward } size="small" color="medium"/>
                </IonItem>
            ))}
        </IonList>
    } else {
        return <div className="spin">
            <IonSpinner name="dots"/>
        </div>;
    }
};

export default Categories;