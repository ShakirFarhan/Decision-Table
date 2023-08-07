import Papa from 'papaparse';
import * as XLSX from 'xlsx';



/**
 * Checks if the input value is a valid Date object.
 * @param value - The value to be checked.
 * @returns {boolean} - Returns true if the input value is a valid Date object, otherwise returns false.
 */
function isDate(value: any): boolean {
  return new Date(value) instanceof Date;
}

/**
 * Checks if a given date falls within a specified date range.
 * @param startDate - The start date of the range.
 * @param endDate - The end date of the range.
 * @param dateToCheck - The date to be checked if it falls within the range.
 * @returns {boolean} - Returns true if the dateToCheck is between startDate and endDate (inclusive), otherwise returns false.
 */
function isDateBetween(
  startDate: Date,
  endDate: Date,
  dateToCheck: Date
): boolean {
  return startDate <= dateToCheck && dateToCheck <= endDate;
}


/**
 * Checks if a given year falls within a specified year range.
 * @param startDate - The start year of the range (as a Date object).
 * @param endDate - The end year of the range (as a Date object).
 * @param dateToCheck - The year to be checked if it falls within the range.
 * @returns {boolean} - Returns true if the dateToCheck (year) is between the years of startDate and endDate (inclusive), otherwise returns false.
 */
function isYearbetween(
  startDate: Date,
  endDate: Date,
  dateToCheck: any
): boolean {
  return (
    new Date(startDate).getFullYear() <= dateToCheck &&
    dateToCheck <= new Date(endDate).getFullYear()
  );
}

/**
 * Checks if a given time string is a valid 24-hour time format (hh:mm).
 * @param timeString - The time string to be checked.
 * @returns {boolean} - Returns true if the timeString is a valid 24-hour time format (hh:mm), otherwise returns false.
 */
function isValidTime(timeString: string): boolean {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}


/**
 * Converts a given time string (in the format "hh:mm") to a Date object with the same time set.
 * The date portion of the returned Date object will be the current date.
 * @param timeString - The time string (in the format "hh:mm") to be converted.
 * @returns {Date} - Returns a Date object with the time set according to the input timeString and the date portion set to the current date.
 */
export function convertTimeStringToDate(timeString: string): Date {
  const today = new Date(); // Get the current date
  const [hours, minutes] = timeString.split(':'); // Split the time string into hours and minutes

  // Set the time components to the current date
  today.setHours(Number(hours));
  today.setMinutes(Number(minutes));
  today.setSeconds(0);
  today.setMilliseconds(0);

  return today;
}


/**
 * Formats a given Date object into a string in the format "dd-mm-yyyy".
 * @param dateString - The Date object to be formatted.
 * @returns {string} - Returns a string representation of the input date in the format "dd-mm-yyyy".
 */
export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}



/**
 * Determines the type of input required based on the column data type and selected option.
 * @param colDatatype - The data type of the column (e.g., 'String', 'Number', 'Date', etc.).
 * @param selectedOption - The selected option for the input (e.g., 'between', 'isequal', 'is negative', etc.).
 * @returns {string} - Returns a string indicating the type of input required. Possible return values are:
 *   - 'no-input': No input is required.
 *   - 'single-input': A single input value is required.
 *   - 'two-input': Two input values are required.
 *   - 'date-inputs': Input for a date range is required.
 *   - 'time-inputs': Input for a time range is required.
 *   - 'date-time-inputs': Input for a date-time range is required.
 *   - 'day-time-inputs': Input for a day-time duration is required.
 *   - 'year-year-inputs': Input for a year-to-year duration is required.
 *   - 'month-month-inputs': Input for a month-to-month duration is required.
 */
export const getTypeOfInput = (colDatatype: string, selectedOption: string) => {
  if (colDatatype === 'String') {
    if (
      selectedOption?.toLowerCase() !== undefined &&
      selectedOption?.toLowerCase() !== '' && selectedOption?.toLowerCase() !== 'iscapital' && selectedOption?.toLowerCase() !== 'issmall' && selectedOption?.toLowerCase() !== 'isalphanumeric'
    ) {
      // For string type with custom selectedOption (not empty, not 'iscapital', not 'issmall', not 'isalphanumeric')
      return 'single-input';
    } else {
      // For string type with empty or specific predefined selectedOption (e.g., 'iscapital', 'issmall', 'isalphanumeric')
      return 'no-input';
    }
  } else if (colDatatype === 'Number') {
    if (selectedOption?.toLowerCase() === 'between') {
      // For numeric type with 'between' selectedOption
      return 'two-input';
    } else if (
      selectedOption?.toLowerCase() === 'isequal' ||
      selectedOption?.toLowerCase() === 'iseven' ||
      selectedOption?.toLowerCase() === 'is odd' ||
      selectedOption?.toLowerCase() === 'is negative' ||
      selectedOption?.toLowerCase() === 'is zero' ||
      selectedOption?.toLowerCase() === 'is not zero'
    ) {
      // For numeric type with predefined selectedOption (e.g., 'isequal', 'iseven', etc.)
      return 'no-input';
    } else {
      // For numeric type with other selectedOption
      return 'single-input';
    }
  } else if (colDatatype === 'Date') {
    if (selectedOption?.toLowerCase() === 'between') {
      // For Date type with 'between' selectedOption
      return 'date-inputs';
    }
  } else if (colDatatype === 'Time') {
    if (selectedOption?.toLowerCase() === 'between') {
      // For Time type with 'between' selectedOption
      return 'time-inputs';
    }
  } else if (colDatatype === 'Date Time') {
    if (selectedOption?.toLowerCase() === 'between') {
      // For Date Time type with 'between' selectedOption
      return 'date-time-inputs';
    }
  } else if (colDatatype === 'Day Time Duration') {
    if (selectedOption?.toLowerCase() === 'from daytime to daytime') {
      // For Day Time Duration type with 'from daytime to daytime' selectedOption
      return 'day-time-inputs';
    }
  } else if (colDatatype === 'Year Month Duration') {
    if (selectedOption?.toLowerCase() === 'from year to year') {
      // For Year Month Duration type with 'from year to year' selectedOption
      return 'year-year-inputs';
    }
    if (selectedOption?.toLowerCase() === 'from month to month') {
      // For Year Month Duration type with 'from month to month' selectedOption
      return 'month-month-inputs';
    }
  }
};




/**
 * Returns a special type label for a given selectedOption.
 * @param selectedOption - The input selectedOption string for which a special type label is needed.
 * @returns {string} - Returns the special type label corresponding to the input selectedOption, or the original selectedOption if no special label is found.
 */
export const getSpecialTypeLabels = (selectedOption: string): string => {
  // If the selectedOption is 'greater than', return '>'
  if (selectedOption.toLowerCase() === 'greater than') {
    return '>';
  }
  // If the selectedOption is 'less than', return '<'
  else if (selectedOption.toLowerCase() === 'less than') {
    return '<';
  }
  // If the selectedOption is 'does not equal', return '≠'
  else if (selectedOption.toLowerCase() === 'does not equal') {
    return '≠';
  }
  // If the selectedOption is 'equal', return '='
  else if (selectedOption.toLowerCase() === 'equal') {
    return '=';
  }
  // If the selectedOption is 'greater than or equal to', return '≥'
  else if (selectedOption.toLowerCase() === 'greater than or equal to') {
    return '≥';
  }
  // If the selectedOption is 'less than or equal to', return '≤'
  else if (selectedOption.toLowerCase() === 'less than or equal to') {
    return '≤';
  }
  // If none of the above conditions match, return the original selectedOption
  else {
    return selectedOption;
  }
};



/**
 * Checks the validity of a given value based on the specified type.
 * @param type - The type of validation to perform.
 * @param value - The value to be validated.
 * @returns {boolean} - Returns true if the value is valid according to the specified type, otherwise returns false.
 */
export const checkValidity = (type: any, value: any): boolean => {
  // Define an array of regular expressions for string-based validations
  const forString = [
    { id: 'capital', regex: '^[A-Z]+$' },
    { id: 'small', regex: '^[a-z]+$' },
    { id: 'alpha numeric', regex: '^[A-Za-z0-9]+$' },
  ];

  // Check if necessary data (type and value) is provided
  if (
    type &&
    type.value &&
    type.value.type !== undefined &&
    value !== undefined
  ) {
    // Convert the type to lowercase for case-insensitive comparison
    const maintype = type.value.type.toLowerCase();
    // finding regex
    const findRegex = forString.find((value) => value.id === maintype);
    // Check for various validation types and perform the corresponding checks
    if (maintype === 'any') {
      return true; // Always valid for 'any' type
    } else if (maintype === 'iscapital' || maintype === 'issmall' || maintype === 'isalphanumeric') {
      // For string-based validations (capital, small, alpha numeric)
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    } else if (maintype === 'isequal') {
      return type.value.value.firstval === value;
    } else if (maintype === 'does not equal') {
      return type.value.value.firstval !== value;
    } else if (maintype === 'greater than') {
      return type.value.value.firstval < value;
    } else if (maintype === 'less than') {
      return type.value.value.firstval > value;
    } else if (maintype === 'greater than or equal to') {
      return type.value.value.firstval <= value;
    } else if (maintype === 'less than or equal to') {
      return type.value.value.firstval >= value;
    } else if (maintype === 'is even') {
      return value % 2 === 0;
    } else if (maintype === 'is odd') {
      return value % 2 !== 0;
    } else if (maintype === 'is negative') {
      return value < 0;
    } else if (maintype === 'is zero') {
      return value === 0;
    } else if (maintype === 'is not zero') {
      return value !== 0;
    } else if (maintype === 'is a multiple of') {
      return value * value === type?.value?.value?.firstval;
    } else if (maintype === 'is not a multiple of') {
      return value * value !== type.value.value.firstval;
    } else if (maintype === 'between') {
      return (
        value > type.value.value.firstval && value < type.value.value.secondval
      );
    } else if (maintype === 'between date') {
      // Check if both firstval and secondval are valid Date objects
      if (isDate(type.value.value.firstval) && isDate(type.value.value.secondval)) {
        return isDateBetween(
          type.value.value.firstval,
          type.value.value.secondval,
          new Date(value)
        );
      }
    } else if (maintype === 'between time') {
      // Convert the time string to a Date object for comparison
      const timeToDate = convertTimeStringToDate(value);
      return isDateBetween(
        type.value.value.firstval,
        type.value.value.secondval,
        timeToDate
      );
    } else if (maintype === 'from daytime to daytime') {
      // Check if both firstval and secondval are valid Date objects and value is a valid time string
      if (isDate(type.value.value.firstval) && isDate(type.value.value.secondval) && isValidTime(value)) {
        const timeToDate = convertTimeStringToDate(value);
        return isDateBetween(
          type.value.value.firstval,
          type.value.value.secondval,
          timeToDate
        );
      }
    } else if (maintype === 'from year to year') {
      // Check if both firstval and secondval are valid Date objects
      if (isDate(type.value.value.firstval) && isDate(type.value.value.secondval)) {
        return isYearbetween(
          type.value.value.firstval,
          type.value.value.secondval,
          value
        );
      }
    }
  }

  return true; // Default to true if type or value is not provided or the type is not recognized
};


/**
 * Formats a given value into a string representation with leading zeros.
 * @param value - The value to be formatted.
 * @returns {string} - Returns a string representation of the input value with leading zeros if needed.
 */
const getFormattedValue = (value: any): string => {
  return String(value).padStart(2, '0');
};

/**
 * Gets the cell value(s) based on the column data type and the cellValueObject.
 * @param colDataType - The data type of the column.
 * @param cellValueObject - The object containing cell value(s).
 * @returns {any} - Returns the cell value(s) based on the column data type.
 */
export const getCellValue = (colDataType: string, cellValueObject: any): any => {
  if (colDataType) {
    // Check for simple data types (none, string, number, boolean)
    if (
      colDataType.toLowerCase() === 'none' ||
      colDataType.toLowerCase() === 'string' ||
      colDataType.toLowerCase() === 'number' ||
      colDataType.toLowerCase() === 'boolean'
    ) {
      if (cellValueObject) {
        // If cellValueObject has only one value, return it
        if (!cellValueObject.secondval) {
          return cellValueObject.firstval;
        }
        // If cellValueObject has two values, return them as an array
        return [cellValueObject.firstval, cellValueObject.secondval];
      }
    } else {
      // For other data types (e.g., date)
      if (cellValueObject !== undefined) {
        // Format the dates in the cellValueObject and return them as an array
        const formattedDate1 = `${getFormattedValue(cellValueObject.firstval.$D)}:${getFormattedValue(cellValueObject.firstval.$M)}:${cellValueObject.firstval.$y}`;
        const formattedDate2 = `${getFormattedValue(cellValueObject.secondval.$D)}:${getFormattedValue(cellValueObject.secondval.$M)}:${cellValueObject.secondval.$y}`;
        return [formattedDate1, formattedDate2];
      }
    }
  }
};



/**
 * Creates a deep clone of a given object.
 * @param obj - The object to be cloned.
 * @returns {any} - Returns a deep clone of the input object.
 */
export function deepClone(obj: any): any {
  // If the input is null or not an object, return it as is (base case)
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Create a new clone object (array if the original is an array, otherwise object)
  const clone: any = Array.isArray(obj) ? [] : {};

  // Recursively clone the properties of the object
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone; // Return the deep clone
}


/**
 * Performs input validation based on the cell data type and cell value.
 * @param cellDataType - The data type of the cell.
 * @param cellValue - The value of the cell to be validated.
 * @returns {boolean} - Returns true if the cell value is valid according to the specified data type, otherwise returns false.
 */
export function inputValidation(cellDataType: string, cellValue: string): boolean {
  const alphanumbericRegex = /^[a-zA-Z0-9]+$/;
  const numberRegex = /\d/;

  if (cellValue && cellDataType) {
    // Convert the cellDataType to lowercase for case-insensitive comparison
    const cellDataTypeLower = cellDataType.toLowerCase();

    // Check for different data types and perform the corresponding validation
    if (cellDataTypeLower === 'iscapital') {
      // Check if cellValue is all uppercase letters and does not contain any numbers
      return cellValue === cellValue.toUpperCase() && !numberRegex.test(cellValue);
    } else if (cellDataTypeLower === 'issmall') {
      // Check if cellValue is all lowercase letters and does not contain any numbers
      return cellValue === cellValue.toLowerCase() && !numberRegex.test(cellValue);
    } else if (cellDataTypeLower === 'isalphanumeric') {
      // Check if cellValue contains only alphanumeric characters
      return alphanumbericRegex.test(cellValue);
    } else {
      // For other data types (if cellDataType is not recognized), consider the cell value valid
      return true;
    }
  } else if (cellDataType === undefined) {
    // If cellDataType is not provided, consider the cell value valid
    return true;
  } else {
    // If cellValue or cellDataType is not provided, consider the cell value invalid
    return false;
  }
}





/**
 * Checks the import data and sets column headers based on the input data.
 * @param columnHeaders - The array of column headers to be checked and updated.
 * @param setColumnHeaders - The function to update the column headers.
 */
const checkImportData = (columnHeaders: any[], setColumnHeaders: any) => {
  columnHeaders.map((data: object) => {
    const inputString = JSON.stringify(data);
    const regex = /{([^:]+):([^}]+)}/;
    const matches = inputString.match(regex);
    if (matches) {
      const key = matches[1].trim();
      const value = matches[2].trim();
      setColumnHeaders((prev: any) => [
        ...prev,
        {
          headerName: key,
          id: Date.now().toString(),
          dataType: value,
          isPinned: false,
        },
      ]);
    } else {
      console.log('Invalid input format');
    }
  });
};




/**
 * Converts a given file (CSV or Excel) to column headers and sets them using the setColumnHeaders function.
 * @param file - The file to be converted.
 * @param setColumnHeaders - The function to set the column headers.
 */
export const convertFile = (file: File, setColumnHeaders: any) => {
  // If the file is a CSV
  if (file.type === 'text/csv') {
    // Parse the CSV file using Papa.parse library
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: { data: any[] }) {
        let innerColumnHeaders: any = [];
        let innerColumnValues: any = [];
        // Extract column headers and values from the parsed data
        results.data.map((data: any) => {
          innerColumnHeaders.push(Object.keys(data));
          innerColumnValues.push(Object.values(data));
          return null;
        });
        // Call checkImportData to set the column headers using the first row of column headers
        checkImportData(innerColumnHeaders[0], setColumnHeaders);
      },
    });
  } else {
    // If the file is an Excel file
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      // Call checkImportData to set the column headers using the first row of column headers
      checkImportData(jsonData[0], setColumnHeaders);
    };

    // Read the Excel file as an array buffer
    reader.readAsArrayBuffer(file);
  }
};
