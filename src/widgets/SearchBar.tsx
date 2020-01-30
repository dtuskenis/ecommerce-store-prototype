import React from "react";

import {
    IonSearchbar,
} from "@ionic/react";

const SearchBar: React.FC<{ onInputChanged: (input: string) => void}> = ({ onInputChanged }) => (
     <IonSearchbar onIonInput={ event => onInputChanged((event.srcElement as any).value) }/>
);

export default SearchBar;