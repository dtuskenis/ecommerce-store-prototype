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

import RemoteApi from "../../data/RemoteApi";
import BasketManager from "../../data/BasketManager";
import Product from "../../data/Product";

type ProductsProps = {
    categoryId: number
}

const Products: React.FC<ProductsProps> = ({ categoryId }: ProductsProps) => {

    const [products, setProducts] = useState<Array<Product> | null>(null);

    useEffect(() => {
        setProducts(null);
        RemoteApi.get("products", { category: categoryId }, null)
                 .then(results => setProducts(results) );
    }, [categoryId]);

    if (products) {
        return <IonList>
            { products?.map(product => (
                <IonCard key={ product.id }>
                    <IonItem button={true}>
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
