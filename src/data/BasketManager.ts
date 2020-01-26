import RemoteApi from "./RemoteApi";
import UserManager, {User} from "./UserManager";
import Product from "./Product";
import {BehaviorSubject, defer, Observable, of, Subject} from "rxjs";
import {debounceTime, switchMap, tap} from "rxjs/operators";

export class BasketEntry {
    constructor(public product: Product,
                public quantity: number) {}
}

export class Basket {
    constructor(public entries: Array<BasketEntry>) { }
}

const basketUpdates = new Subject<Basket>();
const localBasket = new BehaviorSubject<Basket | null>(null);

basketUpdates
    .pipe(
        tap(updatedBasket => localBasket.next(updatedBasket)),
        debounceTime(250),
    )
    .subscribe(basket => {
        UserManager.getUser()
            .then(user => {
                if (user) {
                    return RemoteApi.post("basket",
                                          { user: user.info.id },
                                          basket.entries,
                                          user.accessToken)
                }
            })
    });

const getBasketFromRemote:  (user: User) => Promise<Basket> = (user) =>
    RemoteApi.get("basket",
                  { user: user.info.id },
                  user.accessToken)
        .then(response => {
            const basketEntriesRaw: Array<any> = response;
            const basket = new Basket(basketEntriesRaw.map(entry => new BasketEntry(entry.product,
                                                                                    entry.quantity)));
            localBasket.next(basket);
            return basket
        });

UserManager.onUserChanged()
    .pipe(
        switchMap(user => {
            if (user) {
                return defer(() => getBasketFromRemote(user))
            } else {
                return of<Basket>(new Basket([]))
            }
        })
    )
    .subscribe(basket => {
        localBasket.next(basket)
    });

function updateBasket(updateFunction: (entries: Array<BasketEntry>) => Array<BasketEntry>) {
    const currentBasket = localBasket.value;
    if (currentBasket) {
        basketUpdates.next(new Basket(updateFunction(currentBasket.entries)));
    }
}

const BasketManager = {

    basket(): Observable<Basket | null> {
        return localBasket
    },

    add(product: Product) {
        const existing = localBasket.value?.entries.find(e => e.product.id === product.id);
        if (existing) {
            this.increaseQuantity(existing)
        } else {
            updateBasket(entries => entries.concat([new BasketEntry(product, 1)]))
        }
    },

    increaseQuantity(basketEntry: BasketEntry) {
        updateBasket(entries => entries.map(entry => {
            if (entry === basketEntry) {
                entry.quantity++;
            }
            return entry;
        }))
    },

    decreaseQuantity(basketEntry: BasketEntry) {
        if (basketEntry.quantity === 1) {
            this.remove(basketEntry.product)
        } else {
            updateBasket(entries => entries.map(entry => {
                if (entry === basketEntry) {
                    entry.quantity--;
                }
                return entry;
            }))
        }
    },

    remove(product: Product) {
        updateBasket(entries => entries.filter(p => p.product.id !== product.id))
    },
};

export default BasketManager;
