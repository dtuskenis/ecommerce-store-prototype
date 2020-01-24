import RemoteApi from "./RemoteApi";
import UserManager from "./UserManager";
import Product from "./Product";
import {BehaviorSubject, defer, Observable, of} from "rxjs";
import {concatAll, debounceTime} from "rxjs/operators";
import AuthSessionManager from "./AuthSessionManager";

export class BasketEntry {
    constructor(public product: Product,
                public quantity: number) {}
}

export class Basket {
    constructor(public entries: Array<BasketEntry>) { }
}

const basketUpdates = new BehaviorSubject<Basket | null>(null);

basketUpdates
    .pipe(
        debounceTime(1000),
    )
    .subscribe(basket => {
        if (basket) {
            AuthSessionManager.accessToken()
                .then(accessToken => UserManager.getUserInfo()
                    .then(userInfo => {
                        if (accessToken && userInfo) {
                            return RemoteApi.post("basket",
                                                  { user: userInfo?.id || '' },
                                                  basket.entries,
                                                  accessToken)
                        }
                    }))
        }
    });

function updateBasket() {
    basketUpdates.next(localBasket.value);
}

const localBasket = new BehaviorSubject<Basket>(new Basket([]));

const BasketManager = {

    basket(): Observable<Basket> {
        const getBasketFromRemote: () => Promise<Basket> = () =>
            AuthSessionManager.accessToken()
                .then(accessToken => UserManager.getUserInfo()
                    .then(userInfo => {
                        if (accessToken && userInfo) {
                            return RemoteApi.get("basket",
                                                 { user: userInfo?.id || '' },
                                                 accessToken)
                        } else {
                            return []
                        }
                    }))
                .then(response => {
                    const basketEntriesRaw: Array<any> = response;
                    const basket = new Basket(basketEntriesRaw.map(entry => new BasketEntry(entry.product,
                                                                                            entry.quantity)));
                    localBasket.next(basket);
                    return basket
                });
        return of(defer(() => getBasketFromRemote()), localBasket)
                .pipe(concatAll())
    },

    add(product: Product) {
        const existing = localBasket.value.entries.find(e => e.product.id === product.id);
        if (existing) {
            this.increaseQuantity(existing)
        } else {
            localBasket.next(new Basket(localBasket.value.entries.concat([new BasketEntry(product, 1)])));
            updateBasket()
        }
    },

    increaseQuantity(basketEntry: BasketEntry) {
        localBasket.next(new Basket(localBasket.value.entries.map(entry => {
            if (entry === basketEntry) {
                entry.quantity++;
            }
            return entry;
        })));
        updateBasket()
    },

    decreaseQuantity(basketEntry: BasketEntry) {
        if (basketEntry.quantity === 1) {
            this.remove(basketEntry.product)
        } else {
            localBasket.next(new Basket(localBasket.value.entries.map(entry => {
                if (entry === basketEntry) {
                    entry.quantity--;
                }
                return entry;
            })));
            updateBasket()
        }
    },

    remove(product: Product) {
        localBasket.next(new Basket(localBasket.value.entries.filter(p => p.product.id !== product.id)));
        updateBasket()
    },

};

export default BasketManager;
