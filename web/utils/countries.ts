import { KeyValue } from "@/types";

export const countries = [
  {
    name: 'Australia',
    code: 'AU',
    states: [
      { value: 'New South Wales', key: 'NSW' },
      { value: 'Queensland', key: 'QLD' },
      { value: 'Tasmania', key: 'TAS' },
      { value: 'Victoria', key: 'VIC' },
      { value: 'Western Australia', key: 'WA' },
      { value: 'South Australia', key: 'SA' },
    ] as KeyValue<string>[],
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    states: [],
  },
];
// Temp countries untils select allows objects
export const countriesTemp: KeyValue<string>[] = [
  { key: 'AU', value: 'Australia' },
  { key: 'NZ', value: 'New Zealand' }
];
