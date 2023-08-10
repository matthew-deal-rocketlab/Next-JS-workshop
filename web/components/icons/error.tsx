import * as React from 'react';
import { SVGProps } from 'react';
const ErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-6 h-6"
    viewBox="0 0 24 24"
    {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z"
    />
  </svg>
);
export default ErrorIcon;
