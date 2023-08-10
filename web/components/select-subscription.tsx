import React from 'react';
import styled, { useTheme } from 'styled-components';

import { Button, Card, Text, Icon, IconType } from '.';
import { themeStatic } from '@/theme';

interface Props {
  plans: ISubscription[];
}

export interface ISubscription {
  id: number;
  name: string;
  price: number;
  features: string[];
  description: string;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectSubscriptionContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
  }
  align-items: center;
  justify-content: center;
  justify-items: center;
`;
const SubscriptionCard = styled(Card)`
  height: 400px;
  width: 250px;
  margin: 10px;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    width: 80%;
    height: auto;
  }
`;
const SubscribeButton = styled(Button)`
  margin-top: auto;
  @media (max-width: ${themeStatic.breakpoints.tablet}) {
    margin-top: 10px;
  }
`;
const FeatureContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0;
`;
const Hr = styled.hr`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.light};
  margin: auto 0 10px 0;
`;

const SelectPlan = ({ plans }: Props) => {
  const theme = useTheme();

  return (
    <Container>
      <Text
        fontSize={themeStatic.fontSizes.large}
        fontWeight={themeStatic.fontWeights.bold}>
        All plans
      </Text>

      <SelectSubscriptionContainer>
        {plans.map(plan => {
          return (
            <SubscriptionCard key={plan.id}>
              <Text fontSize="16px" fontWeight="700" margin="5px 0">
                {plan.name}
              </Text>
              <Text fontSize="30px" fontWeight="700" margin="10px 0">
                ${plan.price}/mth
              </Text>
              <Text
                fontSize="12px"
                color={theme.colors.dark2}
                margin="10px 0 20px 0">
                {plan.description}
              </Text>

              {plan.features.map(feature => (
                <FeatureContainer key={feature}>
                  <Icon
                    icon={IconType.Success}
                    height={24}
                    width={24}
                    stroke={theme.colors.primary}
                  />
                  <Text key={feature} margin="0 5px">
                    {feature}
                  </Text>
                </FeatureContainer>
              ))}
              <Hr />
              <Text
                fontSize={themeStatic.fontSizes.small}
                color={theme.colors.dark2}
                fontWeight="700">
                Aditional features
              </Text>
              <Text
                fontSize={themeStatic.fontSizes.mini}
                color={theme.colors.dark2}>
                Something else
              </Text>
              <SubscribeButton variant="medium">Subscribe</SubscribeButton>
            </SubscriptionCard>
          );
        })}
      </SelectSubscriptionContainer>
    </Container>
  );
};

export default SelectPlan;
