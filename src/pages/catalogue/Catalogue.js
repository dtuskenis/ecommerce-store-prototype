import React, {useState} from 'react';

import Categories from "./Categories";
import Products from "./Products";

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import {IonContent, IonHeader, IonTitle, IonToolbar,IonSearchbar} from "@ionic/react";
import {IonPage} from "@ionic/react";

const useStyles = makeStyles(theme => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

function Catalogue() {
    const classes = useStyles();

    const [selectedCategoryId, setSelectedCategoryId] = useState(1);

    return (<IonPage>
        <React.Fragment>
          <CssBaseline />

          <IonHeader>
            <IonToolbar>
              <IonTitle>Store</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>

            <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Categories onCategorySelected={ categoryId => { setSelectedCategoryId(categoryId)} }/>
                <IonSearchbar/>
              </Container>
            </div>

            <Container className={classes.cardGrid} maxWidth="md">
              <Products categoryId={selectedCategoryId}/>
            </Container>

          </IonContent>

        </React.Fragment>
        </IonPage>
    );
}

export default Catalogue;