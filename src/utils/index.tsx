import { ReactNode } from "react";

export const checkTypeAndRender = (type: any) => {
    console.log(type)

    return null;
}

export const checkValidity = (type: any, value: any) => {
    console.log(type, value)

    console.log(type?.value?.value);
    if((type && type.value && type.value.value !== undefined) && value !== undefined){
        return type.value.value < value ? true : false;
    }

    return true;
}