import React, { ReactNode } from 'react';
import styled, { StyleSheetManager } from 'styled-components';

import { themeStatic } from '@/theme';

interface FormRowProps {
  align?: 'left' | 'center' | 'right';
  fullwidth?: boolean;
  children: ReactNode;
}
const StyledFormRow = styled.div<FormRowProps>`
  width: 100%;
  margin-top: ${themeStatic.spacing.formfieldY};
  margin-bottom: ${themeStatic.spacing.formfieldY};
  display: ${(props: FormRowProps) => (props.fullwidth ? 'flex' : 'block')};
  flex-direction: column;
  text-align: ${(props: FormRowProps) => props.align};
`;

const FormRow = ({
  align = 'left',
  fullwidth = true,
  ...props
}: FormRowProps) => {
  return (
    <StyleSheetManager
      shouldForwardProp={prop => ['align', 'fullwidth'].indexOf(prop) < 0}>
      <StyledFormRow
        x-name="FormRow"
        align={align}
        fullwidth={fullwidth}
        {...props}
      />
    </StyleSheetManager>
  );
};

export default FormRow;
