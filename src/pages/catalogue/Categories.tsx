import React, {useEffect, useState} from "react";
import {
    IonButton,
} from "@ionic/react";

import "./Categories.css"

import RemoteApi from "../../data/RemoteApi";
import Category from "../../data/Category";

const Categories: React.FC = () => {

    const [categories, setCategories] = useState<Array<Category>>([]);

    useEffect(() =>  {
        RemoteApi.get("categories", {}, null)
                 .then(results => setCategories(results));
    }, []);

    return (
        <div className="container">
            { categories.map((category) => (
                <IonButton shape="round"
                           fill="outline"
                           size="small"
                           color="dark"
                           key={ category.id }
                           routerLink={ "catalogue/" + category.id }>
                    { category.name }
                </IonButton>
            ))}
        </div>
    )
};

export default Categories
