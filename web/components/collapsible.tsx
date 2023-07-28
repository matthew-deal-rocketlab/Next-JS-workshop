import React, { useState, ReactNode, useRef, useEffect } from 'react';
import styled from 'styled-components';

type CollapsibleProps = {
  title: ReactNode;
  children: ReactNode;
};

type ContentProps = {
  $expanded: boolean;
  $height: number;
};

const CollapsibleContainer = styled.div`
  color: white;
  cursor: pointer;
  width: 100%;
  border: none;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Content = styled.div<ContentProps>`
  padding: 0 18px;
  max-height: ${({ $expanded, $height }) => ($expanded ? `${$height}px` : '0')};
  overflow: hidden;
  transition: max-height 0.6s ease;
`;

const Collapsible = ({ title, children }: CollapsibleProps) => {
  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <>
      <CollapsibleContainer onClick={handleToggle}>
        {title}
      </CollapsibleContainer>
      <Content $expanded={expanded} $height={height} ref={contentRef}>
        {children}
      </Content>
    </>
  );
};

export default Collapsible;
