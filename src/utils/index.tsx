export const checkTypeAndRender = (type: any) => {
    console.log(type)
    // this is portion will be used to check the cell type and render reusable component based on that as input field

    return null;
}

export const checkValidity = (type: any, value: any) => {

    if((type && type.value && type.value.value !== undefined) && value !== undefined){
        return type.value.value < value ? true : false;
    }

    return true;
}