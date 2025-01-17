import {BehaviorSubject, defer, Observable} from "rxjs";
import {debounceTime, shareReplay, switchMap} from "rxjs/operators";
import {fromPromise} from "rxjs/internal-compatibility";
import Product from "./Product";
import RemoteApi from "./RemoteApi";

const searchQuery = new BehaviorSubject<string>("");

const CatalogueManager = {

    categories: defer(() => fromPromise(RemoteApi.get("categories", {}, null)))
                    .pipe(shareReplay()),

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

export default CatalogueManager;