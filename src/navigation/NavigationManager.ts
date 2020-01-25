import {BehaviorSubject, Observable} from "rxjs";

const route = new BehaviorSubject<Destination | null>(null);

export enum Destination {
    ROOT
}

const NavigationManager = {

    route(): Observable<Destination | null> {
        return route
    },

    navigateToRoot() {
        route.next(Destination.ROOT)
    }
};

export default NavigationManager;