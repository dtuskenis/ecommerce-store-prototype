import React, {useEffect, useState} from "react";
import {
    IonButton,
    IonItem,
} from "@ionic/react";

import "./Categories.css"

import RemoteApi from "../../data/RemoteApi";
import Category from "../../data/Category";

type Props = {
    onCategorySelected: (id: number) => void
}

const Categories: React.FC<Props> = (props) => {

    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() =>  {
        RemoteApi.get("categories", {}, null)
                 .then(results => setCategories(results));
    }, []);

    return (
        <IonItem className="container" lines="none">
            { categories.map((category) => (
                <IonButton shape="round"
                           fill="outline"
                           color="dark"
                           key={ category.id }
                           onClick={ () => props.onCategorySelected(category.id) }>
                    { category.name }
                </IonButton>
            ))}
        </IonItem>
    )
};

export default Categories
