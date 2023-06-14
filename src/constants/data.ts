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
