import {
  MouseEventHandler,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled, { css, useTheme } from 'styled-components';
import { Icon, IconType, Text } from './';
import { KeyValue } from '@/types.d';
import { themeStatic } from '@/theme';

interface SelectProps extends React.HTMLProps<HTMLSelectElement> {
  placeholder: string;
  error?: string;
  values: KeyValue<string>[];
  onChangeItem?: (value: KeyValue<string>) => void;
}

const SelectContainer = styled.div`
  position: relative;
  margin: 0;
`;
const SelectLabelButton = styled.button`
  padding-left: 5px;
  height: 25px;
  width: 100%;
  background-color: ${props => props.theme!.colors.white};
  border-radius: 5px;
  color: ${props => props.theme!.colors.dark};
  border: 1px solid ${props => props.theme!.colors.tertiary};
  cursor: pointer;
  transition: 0.3s ease;
  text-align: left;
  &:hover {
    background-color: #eee;
  }
`;
const DropdownStyle = styled.div<{ $isVisible: boolean }>`
  text-align: left;
  position: absolute;
  top: 0;
  left: 0;
  max-height: 6em;
  width: calc(100% - 12px);
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: #fafafa;
  border: 1px solid ${props => props.theme!.colors.tertiary};
  transition: max-height 0.2s ease;
  overflow-y: scroll;
  ${({ $isVisible }) =>
    $isVisible !== true &&
    css`
      max-height: 40px;
      visibility: hidden;
    `}
`;
const DropdownItem = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 0.15rem 0;
  padding: 0.3rem 0.5rem;
  font-size: 0.9rem;
  font-weight: 400;
  color: #333;
  border-radius: 0.3rem;
  cursor: pointer;
  z-index: ${themeStatic.zIndex.two};
  ${({ $active }) =>
    $active &&
    css`
      color: ${({ theme }) => theme.colors.primary};
      font-weight: ${themeStatic.fontWeights.bold};
    `}
  &:hover, :focus, :focus:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fafafa;
    outline: none;
  }
`;
const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0.5rem;
  top: 30%;
`;
const StyledError = styled.div`
  color: ${props => props.theme!.colors.error.main};
  font-family: ${themeStatic.font.inter};
  font-size: ${themeStatic.fontSizes.mini};
`;

const Select = ({ placeholder, values, error, onChangeItem }: SelectProps) => {
  const [currentValue, setCurrentValue] = useState<KeyValue<string> | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  useOutsideAlerter(dropdown);

  const handleOpen = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleValueChange = (value: KeyValue<string>) => {
    setCurrentValue(value);
  };

  const handleChange = (value: KeyValue<string>) => {
    handleValueChange(value);
    // call method, if it exists
    if (typeof onChangeItem === 'function') {
      onChangeItem(value);
    }
    // close, after all tasks are finished
    handleClose();
  };
  // capture click outside of dropdown
  function useOutsideAlerter(ref: RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        event.preventDefault();
        if (
          open &&
          ref.current &&
          !ref.current.contains(event.target as Node)
        ) {
          handleClose();
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, open]);
  }
  const Placeholder = () => {
    const theme = useTheme();
    const size = themeStatic.fontSizes.small;
    const color = theme.colors.tertiary;
    return (
      <Text fontSize={size} color={color}>
        {placeholder}
      </Text>
    );
  };

  return (
    <SelectContainer>
      <SelectLabelButton onClick={handleOpen as unknown as MouseEventHandler}>
        {!currentValue && <Placeholder />}
        {currentValue && currentValue.value}
        <StyledIcon icon={IconType.ArrowDown} height={10} width={10} />
      </SelectLabelButton>
      <DropdownStyle $isVisible={open} ref={dropdown}>
        {values.map((item, index) => (
          <DropdownItem
            onClick={() => handleChange(item)}
            $active={item === currentValue}
            key={index}>
            {item.value}
          </DropdownItem>
        ))}
      </DropdownStyle>
      {error && <StyledError>{error}</StyledError>}
    </SelectContainer>
  );
};

export default Select;
