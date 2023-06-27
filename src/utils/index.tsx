export const getTypeOfInput = (colDatatype: any, selectedOption: any) => {
  if (colDatatype === 'String') {
    if (selectedOption?.toLowerCase() !== undefined) return 'single-input';
  } else if (colDatatype === 'Number') {
    if (selectedOption?.toLowerCase() === 'between') {
      return 'two-input';
    } else if (
      selectedOption?.toLowerCase() === 'is even' ||
      selectedOption?.toLowerCase() === 'is odd' ||
      selectedOption?.toLowerCase() === 'is negative' ||
      selectedOption?.toLowerCase() === 'is zero' ||
      selectedOption?.toLowerCase() === 'is not zero'
    ) {
      return 'no-input';
    } else {
      return 'single-input';
    }
  } else if (colDatatype === 'Date') {
    if (selectedOption?.toLowerCase() === 'between') return 'date-inputs';
  } else if (colDatatype === 'Time') {
    if (selectedOption?.toLowerCase() === 'between') return 'time-inputs';
  } else if (colDatatype === 'Date Time') {
    if (selectedOption?.toLowerCase() === 'between') return 'date-time-inputs';
  } else if (colDatatype === 'Day Time Duration') {
    if (selectedOption?.toLowerCase() === 'from daytime to daytime')
      return 'day-time-inputs';
  } else if (colDatatype === 'Year Month Duration') {
    if (selectedOption?.toLowerCase() === 'from year to year') {
      return 'year-year-inputs';
    }
    if (selectedOption?.toLowerCase() === 'from month to month') {
      return 'month-month-inputs';
    }
  }
};
export const getSpecialTypeLabels = (selectedOption: any) => {
  if (selectedOption.toLowerCase() === 'greater than') {
    return '>';
  } else if (selectedOption.toLowerCase() === 'less than') {
    return '<';
  } else if (selectedOption.toLowerCase() === 'does not equal') {
    return '≠';
  } else if (selectedOption.toLowerCase() === 'equal') {
    return '=';
  } else if (selectedOption.toLowerCase() === 'greater than or equal to') {
    return '≥';
  } else if (selectedOption.toLowerCase() === 'less than or equal to') {
    return '≤';
  }  else {
    return selectedOption;
  }
};

export const checkValidity = (type: any, value: any) => {

  const forString = [
    { id: 'capital', regex: '^[A-Z]+$' },
    { id: 'small', regex: '^[a-z]+$' },
    { id: 'alpha numeric', regex: '^[A-Za-z0-9]+$' },
  ]

  if (
    type &&
    type.value &&
    type.value.type !== undefined &&
    value !== undefined
  ) {
    const maintype = type.value.type.toLowerCase()
    const findRegex = forString.find(value => value.id === maintype);
    console.log({ maintype });
    if (maintype === "any"){
      return true;
    }
    else if (maintype === 'capital'){
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    }
    else if (maintype === 'small') {
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    }
    else if (maintype === 'alpha numeric') {
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    }
    else if(maintype === 'equal'){
      return type.value.value === value
    }
    else if(maintype === 'does not equal'){
      return type.value.value !== value
    }
    else if(maintype === 'greater than'){
      return type.value.value < value
    }
    else if(maintype === 'less than'){
      return type.value.value > value
    }
    else if(maintype === 'greater than or equal to'){
      return type.value.value <= value
    }
    else if(maintype === 'less than or equal to'){
      return type.value.value >= value
    }
    else if(maintype === 'is even'){
      return value % 2 === 0;
    }
    else if(maintype === 'is odd'){
      return value % 2 !== 0
    }
    else if(maintype === 'is negative'){
      return value < 0
    }
    else if(maintype === 'is zero'){
      return value === 0
    }
    else if(maintype === 'is not zero'){
      return value !== 0
    }
    else if(maintype === 'is a multiple of'){
      return value * value === type.value.value
    }
    else if(maintype === 'is not a multiple of'){
      return value * value !== type.value.value
    }
    // return type.value.value < value ? true : false;
  }

  return true;
};
