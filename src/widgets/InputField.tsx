import React from "react";

import {
    IonInput,
} from "@ionic/react";

export type InputFieldProps = {
    className: string | undefined,
    type: "text" | "email" | "password",
    onInputChanged: (input: string) => void
}

const InputField: React.FC<InputFieldProps> = ({ className, type, onInputChanged }) => (
    <IonInput type={type}
              className={ className }
              onIonInput={ event => onInputChanged((event.srcElement as any).value) }/>
);

export default InputField;