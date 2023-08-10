import styled, { useTheme } from 'styled-components';

import { Button, Card, Text } from './';
import { themeStatic } from '@/theme';

export interface IResumeSubscription {
  name: string;
  price: number;
  nextPaymentDate: string;
  onSubscribe: () => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin 0;
  align-items: center;
`;
const ResumeCard = styled(Card)`
  width: 900px;
  margin: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    height: auto;
    grid-template-columns: 1fr 1fr;
    width: 80%;
  }
  @media (max-width: ${themeStatic.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  height: 70px;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    align-items: center;
    justify-content: flex-start;Biller
  }
`;
const StyledButton = styled(Button)`
  width: 140px;
  height: 35px;
  margin: 10px;
  align-self: center;
  justify-self: right;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    justify-self: center;
  }
`;

const ResumeSubscription = ({
  name,
  price,
  nextPaymentDate,
  onSubscribe,
}: IResumeSubscription) => {
  const theme = useTheme();
  return (
    <Container>
      <Text
        fontSize={themeStatic.fontSizes.large}
        fontWeight={themeStatic.fontWeights.bold}
        align="center">
        My current plan
      </Text>
      <ResumeCard>
        <Column>
          <Text
            fontSize={themeStatic.fontSizes.medium}
            fontWeight={themeStatic.fontWeights.bold}
            color={theme.colors.primary}>
            Subscription type
          </Text>
          <Text fontSize={themeStatic.fontSizes.normal}>{name}</Text>
        </Column>
        <Column>
          <Text
            fontSize={themeStatic.fontSizes.medium}
            fontWeight={themeStatic.fontWeights.bold}
            color={theme.colors.primary}>
            Subscription price
          </Text>
          <Text fontSize={themeStatic.fontSizes.normal}>{`$${price}/mth`}</Text>
        </Column>
        <Column>
          <Text
            fontSize={themeStatic.fontSizes.medium}
            fontWeight={themeStatic.fontWeights.bold}
            color={theme.colors.primary}>
            Next payment date
          </Text>
          <Text fontSize={themeStatic.fontSizes.normal}>{nextPaymentDate}</Text>
        </Column>
        <StyledButton variant="medium" onClick={onSubscribe}>
          Some action
        </StyledButton>
      </ResumeCard>
    </Container>
  );
};

export default ResumeSubscription;
