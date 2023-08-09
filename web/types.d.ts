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
  id: string;
  label: string;
  link?: string;
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

interface IAlertMessage {
  type: ColorType;
  message: string;
}

interface IBaseText {
  children: ReactNode;
  $color?: string;
  $size?: string;
  $weight?: string;
  $align?: string;
  $margin?: string;
  $padding?: string;
}

interface ILinkText extends IBaseText {
  href: string;
  $overColor?: string;
}

interface ISubscription {
  id: number;
  name: string;
  price: number;
  features: string[];
  description: string;
}

interface IResumeSubscription {
  name: string;
  price: number;
  nextPaymentDate: string;
  onSubscribe: () => void;
}
