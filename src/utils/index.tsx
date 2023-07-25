import Papa from 'papaparse';
import * as XLSX from 'xlsx';
function isDate(value: any): boolean {
  return new Date(value) instanceof Date;
}

function isDateBetween(
  startDate: Date,
  endDate: Date,
  dateToCheck: Date
): boolean {
  return startDate <= dateToCheck && dateToCheck <= endDate;
}

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

function isValidTime(timeString: string): boolean {
  const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

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

export function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export const getTypeOfInput = (colDatatype: string, selectedOption: string) => {
  if (colDatatype === 'String') {
    if (
      selectedOption?.toLowerCase() !== undefined &&
      selectedOption?.toLowerCase() !== ''
    )
      return 'single-input';
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
export const getSpecialTypeLabels = (selectedOption: string) => {
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
  } else {
    return selectedOption;
  }
};

export const checkValidity = (type: any, value: any) => {
  const forString = [
    { id: 'capital', regex: '^[A-Z]+$' },
    { id: 'small', regex: '^[a-z]+$' },
    { id: 'alpha numeric', regex: '^[A-Za-z0-9]+$' },
  ];

  if (
    type &&
    type.value &&
    type.value.type !== undefined &&
    value !== undefined
  ) {
    const maintype = type.value.type.toLowerCase();
    const findRegex = forString.find((value) => value.id === maintype);
    if (maintype === 'any') {
      return true;
    } else if (maintype === 'capital') {
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    } else if (maintype === 'small') {
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    } else if (maintype === 'alpha numeric') {
      const pattern = new RegExp(findRegex!.regex);
      return pattern.test(value);
    } else if (maintype === 'equal') {
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
      if (
        isDate(type.value.value.firstval) &&
        isDate(type.value.value.secondval)
      ) {
        return isDateBetween(
          type.value.value.firstval,
          type.value.value.secondval,
          new Date(value)
        );
      }
    } else if (maintype === 'between time') {
      const timeToDate = convertTimeStringToDate(value);
      return isDateBetween(
        type.value.value.firstval,
        type.value.value.secondval,
        timeToDate
      );
    } else if (maintype === 'from daytime to daytime') {
      if (
        isDate(type.value.value.firstval) &&
        isDate(type.value.value.secondval) &&
        isValidTime(value)
      ) {
        const timeToDate = convertTimeStringToDate(value);
        return isDateBetween(
          type.value.value.firstval,
          type.value.value.secondval,
          timeToDate
        );
      }
    } else if (maintype === 'from year to year') {
      if (
        isDate(type.value.value.firstval) &&
        isDate(type.value.value.secondval)
      ) {
        return isYearbetween(
          type.value.value.firstval,
          type.value.value.secondval,
          value
        );
      }
    }
  }

  return true;
};

const getFormattedValue = (value: any) => {
  return String(value).padStart(2, '0');
};

export const getCellValue = (colDataType: string, cellValueObject: any) => {
  if (colDataType) {
    if (
      colDataType.toLowerCase() === 'none' ||
      colDataType.toLowerCase() === 'string' ||
      colDataType.toLowerCase() === 'number' ||
      colDataType.toLowerCase() === 'boolean'
    ) {
      if (cellValueObject) {
        if (!cellValueObject.secondval) {
          return cellValueObject.firstval;
        }

        return [cellValueObject.firstval, cellValueObject.secondval];
      }
    } else {
      if (cellValueObject !== undefined) {
        const formattedDate1 = `${getFormattedValue(
          cellValueObject.firstval.$D
        )}:${getFormattedValue(cellValueObject.firstval.$M)}:${
          cellValueObject.firstval.$y
        }`;
        const formattedDate2 = `${getFormattedValue(
          cellValueObject.secondval.$D
        )}:${getFormattedValue(cellValueObject.secondval.$M)}:${
          cellValueObject.secondval.$y
        }`;

        return [formattedDate1, formattedDate2];
      }
    }
  }
};
export function deepClone(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

export function inputValidation(cellDataType: string, cellValue: string) {
  let alphanumbericRegex = /^[a-zA-Z0-9]+$/;
  var numberRegex = /\d/;
  if (cellValue && cellDataType) {
    const cellDataTypeLower = cellDataType.toLowerCase();
    if (cellDataTypeLower === 'capital') {
      if (
        cellValue === cellValue.toUpperCase() &&
        !numberRegex.test(cellValue)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (cellDataTypeLower === 'small') {
      if (
        cellValue === cellValue.toLowerCase() &&
        !numberRegex.test(cellValue)
      ) {
        return true;
      } else {
        return false;
      }
    } else if (cellDataTypeLower === 'alpha numeric') {
      return alphanumbericRegex.test(cellValue);
    } else {
      return true;
    }
  } else if (cellDataType === undefined) {
    return true;
  } else return false;
}
const checkImportData = (columnHeaders: any, setColumnHeaders: any) => {
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
export const convertFile = (file: File, setColumnHeaders: any) => {
  if (file.type === 'text/csv') {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results: { data: any[] }) {
        let innerColumnHeaders: any = [];
        let innerColumnValues: any = [];
        results.data.map((data: any) => {
          innerColumnHeaders.push(Object.keys(data));
          innerColumnValues.push(Object.values(data));
          return null;
        });
        checkImportData(innerColumnHeaders[0], setColumnHeaders);
      },
    });
  } else {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
      });
      checkImportData(jsonData[0], setColumnHeaders);
    };

    reader.readAsArrayBuffer(file);
  }
};
