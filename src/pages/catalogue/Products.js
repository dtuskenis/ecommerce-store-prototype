import React, {useEffect, useState} from "react";

import RemoteApi from "../../data/RemoteApi";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import {makeStyles} from "@material-ui/core";
import {IonThumbnail, IonImg} from "@ionic/react";
import BasketManager from "../../data/BasketManager";

const useStyles = makeStyles(() => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const Products = (props) => {
    const classes = useStyles();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        RemoteApi.get("products", { category: props.categoryId }, null)
                 .then(results => setProducts(results) );
    }, [props.categoryId]);

    return (
        <Grid container spacing={4}>
            { products.map(product => (
                <Grid item key={product.id} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>

                        <IonThumbnail>
                            <IonImg  src= { product.imageUrl } />
                        </IonThumbnail>

                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                { product.name }
                            </Typography>
                            <Typography>
                                This is a media card. You can use this section to describe the content.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button  variant="contained" size="small" color="primary">
                                Купить сейчас
                            </Button>
                            <Button  variant="outlined" size="small" color="primary" onClick={ () => BasketManager.add(product) }>
                                В корзину
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
};

export default Products
