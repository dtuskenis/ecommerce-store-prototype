import {defer, Observable} from "rxjs";
import UserManager from "./UserManager";
import RemoteApi from "./RemoteApi";
import {BasketEntry} from "./BasketManager";

export class Order {
    constructor(public id: number)
    {}
}

const OrdersManager = {

    orders(): Observable<Array<Order>> {
        const getOrdersFromRemote = () =>
            UserManager.getUser()
                .then(user => {
                    if (user) {
                        return RemoteApi.get("orders",
                                             { user: user.info.id },
                                             user.accessToken)
                    } else {
                        return []
                    }
                })
                .catch(() => []);
        return defer(() => getOrdersFromRemote())
    },

    makeOrder(basketEntries: Array<BasketEntry>): Promise<any> {
        return UserManager.getUser()
            .then(user => {
                if (user) {
                    return RemoteApi.post("orders",
                                          { user: user.info.id },
                                          basketEntries.map(entry => {
                                              return {
                                                  productId: entry.product.id,
                                                  quantity: entry.quantity,
                                                  price: entry.product.price
                                              }
                                          }),
                                          user.accessToken)
                } else {
                    return []
                }
            })
            .catch(() => []);
    }
};

export default OrdersManager;