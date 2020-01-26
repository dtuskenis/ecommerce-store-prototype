import React, {useEffect, useState} from "react";
import {
    IonImg,
    IonCard,
    IonButton,
    IonList,
    IonItem,
    IonText,
    IonLabel,
    IonProgressBar,
} from "@ionic/react";

import "./Products.css"

import BasketManager from "../../data/BasketManager";
import Product from "../../data/Product";
import ProductsManager from "../../data/ProductsManager";

const Products: React.FC<{ categoryId: number, query: string }> = ({ categoryId, query }) => {

    const [products, setProducts] = useState<Array<Product> | null>(null);

    useEffect(() => {
        setProducts(null);
        const subscription = ProductsManager.getProducts(categoryId).subscribe(products => setProducts(products));
        return () => subscription.unsubscribe()
    }, [categoryId, query]);

    if (products) {
        return <IonList>
            { products?.map(product => (
                <IonCard key={ product.id }>
                    <IonItem  lines="none">
                        <div>
                            <IonImg className="image" src={ product.imageUrl } />
                        </div>
                        <IonLabel className="title">
                            <IonLabel slot="start">{ product.name }</IonLabel>

                            <IonLabel className="price" color="primary">
                                <IonText className="priceText">{ product.price } BYN</IonText>

                            </IonLabel>
                        </IonLabel>
                        <IonButton onClick={ () => BasketManager.add(product) }>
                            В корзину
                        </IonButton>
                    </IonItem>
                </IonCard>
            )) }
        </IonList>
    } else {
        return <IonProgressBar type="indeterminate" />
    }
};

export default Products
