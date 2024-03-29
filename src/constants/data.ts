export const types = [
  {
    id: 1,
    type: 'None',
  },
  {
    id: 2,
    type: 'String',
  },
  {
    id: 3,
    type: 'Booleon',
  },
  {
    id: 4,
    type: 'Number',
  },
  {
    id: 5,
    type: 'Date',
  },
  {
    id: 6,
    type: 'Time',
  },
  {
    id: 7,
    type: 'DateTime',
  },
  {
    id: 8,
    type: 'DayTimeDuration',
  },
  {
    id: 9,
    type: 'YearMonthDuration',
  },
];

export const optionsData = [
  {
    key: 'copy',
    function: 'Copy Output Column',
  },
  {
    key: 'duplicate',
    function: 'Duplicate Output Column',
  },
  {
    key: 'a-z',
    function: 'Sort by A-Z',
  },
  {
    key: 'z-a',
    function: 'Sort by Z-A',
  },
  {
    key: 'remove',
    function: 'Remove Output Column',
  },
];

export const rowOptions = [
  {
    key: 'settings',
    header: 'Settings',
  },
  {
    key: 'duplicate',
    header: 'Duplicate',
  },
  {
    key: 'clear',
    header: 'Clear Rule',
  },
  {
    key: 'delete',
    header: 'Delete Rule',
  },
];

// previous types are removed and this will be used for further things
export const headerTypes = [
  {
    id: 1,
    type: 'None',
    options: [
      // { id: 'any', value: 'Any', regex: "" },
    ],
  },
  {
    id: 2,
    type: 'String',
    options: [
      { id: 'any', value: 'Any', regex: '' },
      { id: 'capital', value: 'isCapital', regex: '^[A-Z]+$' },
      { id: 'small', value: 'isSmall', regex: '^[a-z]+$' },
      { id: 'alphanumeric', value: 'isAlphaNumeric', regex: '^[A-Za-z0-9]+$' },
    ],
  },
  {
    id: 3,
    type: 'Boolean',
    options: [
      { id: 'true', value: 'True', regex: '^True$' },
      { id: 'false', value: 'False', regex: '^False$' },
    ],
  },
  {
    id: 4,
    type: 'Number',
    options: [
      { id: 'equal', value: 'isEqual', regex: '' },
      { id: 'doesnotequal', value: 'Does not equal', regex: '' },
      { id: 'greaterthan', value: 'Greater than', regex: '' },
      { id: 'lessthan', value: 'Less than', regex: '' },
      {
        id: 'greaterthanorequal',
        value: 'Greater than or equal to',
        regex: '',
      },
      { id: 'lessthanorequal', value: 'Less than or equal to', regex: '' },
      { id: 'between', value: 'Between', regex: '' },
      { id: 'iseven', value: 'Is even', regex: '' },
      { id: 'isodd', value: 'Is Odd', regex: '' },
      { id: 'isnegative', value: 'Is negative', regex: '' },
      { id: 'iszero', value: 'Is Zero', regex: '' },
      { id: 'isnotzero', value: 'Is not zero', regex: '' },
      { id: 'ismultipleof', value: 'Is a multiple of', regex: '' },
      { id: 'isnotmultipleof', value: 'Is not a multiple of', regex: '' },
    ],
  },
  {
    id: 5,
    type: 'Date',
    options: [{ id: 'between', value: 'Between', regex: '' }],
  },
  {
    id: 6,
    type: 'Time',
    options: [{ id: 'between', value: 'Between', regex: '' }],
  },
  // {
  //   id: 7,
  //   type: 'Date Time',
  //   options: [{ id: 'between', value: 'Between', regex: '' }],
  // },
  {
    id: 7,
    type: 'Day Time Duration',
    options: [
      { id: 'fromdaytoday', value: 'From DayTime to Daytime', regex: '' },
    ],
  },
  {
    id: 8,
    type: 'Year Month Duration',
    options: [
      { id: 'fromyeartoyear', value: 'From year to year', regex: '' },
      // { id: 'frommonthtomonth', value: 'From Month to Month', regex: '' },
    ],
  },
];

export const cellOptions = [
  { id: 'Any', value: 'Any' },
  { id: 'Equals', value: 'Equals' },
  { id: '≠', value: 'Does not equal' },
  { id: '>', value: 'Greater than' },
  { id: '<', value: 'Less than' },
  { id: '≥', value: 'Greater than or equal to' },
  { id: '≤', value: 'Less than or equal to' },
  { id: 'Between', value: 'Between' },
  { id: 'IsEven', value: 'Is even' },
  { id: 'IsOdd', value: 'Is Odd' },
  { id: 'IsNegative', value: 'Is negative' },
  { id: 'IsZero', value: 'Is Zero' },
  { id: 'IsNotZero', value: 'Is not zero' },
  { id: 'IsMultipleOf', value: 'Is a multiple of' },
  { id: 'IsNotMultipleOf', value: 'Is not a multiple of' },
];
export const hitRatioOptions = [
  { id: 'any', value: 'Any' },
  { id: 'unique', value: 'Unique' },
  { id: 'first', value: 'First' },
  { id: 'priority', value: 'Priority' },
  { id: 'collect', value: 'Collect' },
  { id: 'collectsum', value: 'Collect (Sum)' },
  { id: 'collectmin', value: 'Collect (Min)' },
  { id: 'collectmax', value: 'Collect (Max)' },
  { id: 'collectcount', value: 'Collect (Count)' },
  { id: 'ruleorder', value: 'Rule order' },
  { id: 'outputorder', value: 'Output order' },
];
export function containsSpecialValue(option: string) {
  const specialChars = ['>', '<', '≥', '≤'];
  if (specialChars.includes(option)) {
    return true;
  }
  return false;
}
