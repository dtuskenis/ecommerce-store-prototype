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
    IonBadge,
} from "@ionic/react";

import "./Products.css"

import BasketManager from "../../data/BasketManager";
import Product from "../../data/Product";
import CatalogueManager from "../../data/CatalogueManager";
import { arrowForward } from "ionicons/icons";

const Products: React.FC<{ categoryId: number | null, query: string }> = ({ categoryId, query }) => {

    const [products, setProducts] = useState<Array<Product> | null>(null);

    useEffect(() => {
        setProducts(null);
        const subscription = CatalogueManager.getProducts(categoryId).subscribe(products => setProducts(products));
        return () => subscription.unsubscribe()
    }, [categoryId, query]);

    if (products) {
        return <IonList>
            { products?.map(product => (
                <IonCard key={ product.id } button={ true } onClick={ () => BasketManager.add(product) }>
                    <IonItem  className="products-list-item"  lines="none">
                        <div>
                            <IonImg className="list-item-image" src={ product.imageUrl } />
                            <DiscountBadge product={ product }/>
                        </div>
                        <IonLabel className="product-list-item-title">
                            <IonText className="products-list-item-title-text" slot="start">{ product.name }</IonText>

                            <IonLabel className="products-list-item-price" color="primary">
                                <DiscountText product={ product }/>
                                <IonText className="products-list-item-price-text">{ product.price } BYN</IonText>
                            </IonLabel>
                        </IonLabel>

                        <IonIcon icon={ arrowForward } size="small" color="medium"/>
                    </IonItem>
                </IonCard>
            )) }
        </IonList>
    } else {
        return <IonProgressBar type="indeterminate" />
    }
};

const DiscountText: React.FC<{ product: Product }> = ({product}) => {
    const discount = product.discount;
    if (discount) {
        return <IonText className="products-list-item-price-discount">{ (product.price / (1 - discount)).toFixed(2)  }</IonText>
    } else {
        return <div/>
    }
};

const DiscountBadge: React.FC<{ product: Product }> = ({ product }) => {
    const discount = product.discount;
    if (discount) {
        return <IonBadge className="product-list-item-discount-badge" color="danger">-{ Math.round(discount * 100) }%</IonBadge>
    } else {
        return <div/>
    }
};

export default Products
