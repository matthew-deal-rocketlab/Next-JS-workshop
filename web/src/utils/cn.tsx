import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// This function combines clsx and tailwind-merge.
// This fixed a few issues.

// The Main one: If you were to build an reuseable component that takes a className as a prop,
// and you gave that component a default background color, when you pass in a new backgrond color, you will
// get a conflict between the default background color and the new background color, which means your newly
// passed in background color will not be applied.
// Tailwind Merge fixes this issues

// If you're using this template, and are removing tailing, Delete this file.

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
