import { ReactNode } from 'react';
export const getTypeOfInput = (colDatatype: any, selectedOption: any) => {
  if (colDatatype === 'String') {
    return 'single-input';
  } else if (colDatatype === 'Number') {
    if (selectedOption.toLowerCase() === 'between') {
      return 'two-input';
    } else if (
      selectedOption.toLowerCase() === 'is even' ||
      selectedOption.toLowerCase() === 'is odd' ||
      selectedOption.toLowerCase() === 'is negative' ||
      selectedOption.toLowerCase() === 'is zero' ||
      selectedOption.toLowerCase() === 'is not zero'
    ) {
      return 'no-input';
    } else {
      return 'single-input';
    }
  } else if (colDatatype === 'Date') {
    return 'date-inputs';
  } else if (colDatatype === 'Time') {
    return 'time-inputs';
  } else if (colDatatype === 'Date Time') {
    return 'date-time-inputs';
  } else if (colDatatype === 'Day Time Duration') {
    return 'day-time-inputs';
  } else if (colDatatype === 'Year Month Duration') {
    if (selectedOption.toLowerCase() === 'from year to year') {
      return 'year-year-inputs';
    }
    if (selectedOption.toLowerCase() === 'from month to month') {
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
  } else if (selectedOption.toLowerCase() === 'less than') {
    return '<';
  } else if (selectedOption.toLowerCase() === 'less than') {
    return '<';
  } else if (selectedOption.toLowerCase() === 'less than') {
    return '<';
  } else {
    return selectedOption;
  }
};
