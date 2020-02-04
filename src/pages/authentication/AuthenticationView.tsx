import React, {useEffect, useState} from 'react';
import {
    IonContent,
    IonItem,
    IonLabel, IonLoading,
    IonSegment,
    IonSegmentButton, IonSlide, IonSlides, IonToast,
} from "@ionic/react";

import "./AuthenticationView.css"
import SignInView, {SignInData} from "./SignInView";
import SignUpView, {SignUpData} from "./SignUpView";
import ConfirmationView from "./ConfirmationView";
import {View} from "@ionic/react-router/dist/types/ReactRouter/View";
import UserManager from "../../data/UserManager";

enum ViewState {
    SIGN_IN,
    SIGN_UP,
    CONFIRMATION,
}

function segmentValue(viewState: ViewState): string {
    switch (viewState) {
        case ViewState.SIGN_IN:
            return "signIn";
        case ViewState.SIGN_UP:
            return "signUp";
        case ViewState.CONFIRMATION:
            return "signUp";
    }
}

function loadingMessage(viewState: ViewState): string {
    switch (viewState) {
        case ViewState.SIGN_IN:
            return "Выполняется вход...";
        case ViewState.SIGN_UP:
            return "Регистрация...";
        case ViewState.CONFIRMATION:
            return "Проверка...";
    }
}

const AuthenticationView: React.FC = () => {

    const [viewState, setViewState] = useState<ViewState>(ViewState.SIGN_IN);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitProcess, setSubmitProcess] = useState<Promise<any> | null>(null);

    useEffect(() => {
        submitProcess?.catch(error => setErrorMessage((error as any).message))
                      .finally(() => setSubmitProcess(null));
    }, [submitProcess]);

    return <IonContent>
        <IonItem className="authentication-segment" lines="none">
            <IonSegment value={ segmentValue(viewState) }>
                <IonSegmentButton value={ segmentValue(ViewState.SIGN_IN) }
                                  onClick={ () => setViewState(ViewState.SIGN_IN) }
                                  >
                    <IonLabel>Вход</IonLabel>
                </IonSegmentButton>
                <IonSegmentButton value={ segmentValue(ViewState.SIGN_UP) }
                                  onClick={ () => setViewState(ViewState.SIGN_UP) }
                                  >
                    <IonLabel>Регистрация</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonItem>
        <AuthViewSelector viewState={ viewState } onSubmit={ process => setSubmitProcess(process) }/>
        <IonToast
            position="bottom"
            showCloseButton={ true }
            header="Ошибка"
            isOpen={ errorMessage !== null }
            onDidDismiss={() => setErrorMessage(null)}
            message={ errorMessage || "" }
            duration={ 3000 }
        />
        <IonLoading
            isOpen={ submitProcess !== null }
            message={ loadingMessage(viewState) }
        />
    </IonContent>;
};

const AuthViewSelector: React.FC<{ viewState: ViewState, onSubmit: (process: Promise<any>) => void }> = ({ viewState, onSubmit }) => {
    switch (viewState) {
        case ViewState.SIGN_IN:
            return  <SignInView onSubmit={ onSubmit }/>;
        case ViewState.SIGN_UP:
            return <SignUpView onSubmit={ onSubmit }/>;
        case ViewState.CONFIRMATION:
            return <ConfirmationView/>;
    }
};

export default AuthenticationView;