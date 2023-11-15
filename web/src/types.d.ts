// Put all global types here.  Those are the ones used in many places.
// Where a type or interface is closely related to the component or
// class, export from the component or class instead

import { ReactNode } from 'react';
import { ThemeType, CSSProperties } from 'styled-components';

// Common props for all custom components
interface ICommonProps {
  children?: ReactNode;
  theme?: ThemeType;
  style?: CSSProperties; // allows overriding styles for a component
}

interface IMenuItem {
  // link must be unique
  link: string;
  label: string;
  items?: IMenuItem[];
}

interface KeyValue<T> {
  key: string;
  value: T;
}

type JsonQLInput = {
  [key: string]:
  | string
  | number
  | boolean
  | Array<string | number | boolean>
  | JsonQLInput;
};

type JsonQLOutput = JsonQLInput;

export enum SubmitResultType {
  ok,
  error,
}

interface SubmitResult {
  text: string;
  type: SubmitResultType;
}

type ColorType = 'error' | 'success' | 'warning' | 'info';


interface SiteDetails {
  id?: number,
  user_id?: number,
  timeout?: number,
  height?: number,
  collection_id?: number,
  cookies?: string,
  freqtime?: date,
  width?: number,
  url: string,
  useragent?: string,
  freqtimezone?: string,
  frequency?: string,
}