import React, {useEffect, useState} from "react";

import getData from "../../data/StoreDataProvider";

import Toolbar from "@material-ui/core/Toolbar";

import {makeStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
}));

const Categories = (props) => {
    const classes = useStyles();

    const [categories, setCategories] = useState([]);

    useEffect(() =>  {
        getData("categories", null, (results) => {
            setCategories(results)
        });
    }, []);

    return (
        <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
            { categories.map((category) => (
                <Button  variant="text"
                         size="small"
                         key={ category.id }
                         onClick={ () => props.onCategorySelected(category.id) }>
                    { category.name }
                </Button>
            ))}
        </Toolbar>
    )
};

export default Categories