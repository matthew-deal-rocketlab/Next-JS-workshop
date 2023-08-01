// Put all global types here.  Those are the ones used in many places.
// Where a type or interface is closely related to the component or 
// class, export from the component or class instead

import { ReactNode } from "react";
import { ThemeType, CSSProperties } from "styled-components";

// Generic input props for components
interface ISimpleProps {
  children?: ReactNode;
  theme?: ThemeType;
  style?: CSSProperties;
}

interface IMenuItem {
  id: string;
  label: string;
  link?: string;
  items?: IMenuItem[];
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


export enum SubmitResultType { ok, error }
interface SubmitResult {
  text: string;
  type: SubmitResultType
}
