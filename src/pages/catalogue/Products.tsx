import React, {useEffect, useState} from "react";
import {
    IonImg,
    IonCard,
    IonList,
    IonItem,
    IonText,
    IonLabel,
    IonProgressBar,
    IonIcon,
} from "@ionic/react";

import "./Products.css"

import BasketManager from "../../data/BasketManager";
import Product from "../../data/Product";
import ProductsManager from "../../data/ProductsManager";
import { arrowForward } from "ionicons/icons";

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
                <IonCard key={ product.id } button={ true } onClick={ () => BasketManager.add(product) }>
                    <IonItem  className="products-list-item"  lines="none">
                        <div>
                            <IonImg className="list-item-image" src={ product.imageUrl } />
                        </div>
                        <IonLabel className="product-list-item-title">
                            <IonText className="products-list-item-title-text" slot="start">{ product.name }</IonText>

                            <IonLabel className="products-list-item-price" color="primary">
                                <IonText className="products-list-item-price-text">{ product.price } BYN</IonText>
                            </IonLabel>
                        </IonLabel>

                        <IonIcon icon={ arrowForward } size="small" color="medium"></IonIcon>
                    </IonItem>
                </IonCard>
            )) }
        </IonList>
    } else {
        return <IonProgressBar type="indeterminate" />
    }
};

export default Products
