import {BehaviorSubject, defer, Observable} from "rxjs";
import Product from "./Product";
import {debounceTime, switchMap} from "rxjs/operators";
import RemoteApi from "./RemoteApi";

const searchQuery = new BehaviorSubject<string>("");

const ProductsManager = {

    getProducts(categoryId: number | null): Observable<Array<Product>> {
        
        return searchQuery.pipe(
            debounceTime(250),
            switchMap(query => defer(() => {
                const queryObject: any = {
                    query: query
                };
                if (categoryId) {
                    queryObject.category = categoryId
                }
                return RemoteApi.get("products", queryObject, null)
            }))
        )
    },

    updateQuery(query: string) {
        searchQuery.next(query)
    }
};

export default ProductsManager;