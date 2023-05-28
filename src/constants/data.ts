import { rowType } from './interfaces';

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
    type: 'Data',
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
export const DefaultWhenRowData: rowType[] = [
  {
    id: 1,
    name: 'Shakir Farhan',
    age: 18,
    phone: 88484,
  },
  {
    id: 2,
    name: 'John Doe',
    age: 21,
    phone: 24533,
  },
  {
    id: 3,
    name: 'Rock',
    age: 32,
    phone: 687647,
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
