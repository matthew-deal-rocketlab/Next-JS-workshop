import { ISubscription } from '@/types';
import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Button, Card, Text, Icon } from '.';

interface Props {
  plans: ISubscription[];
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 80%;
    height: auto;
  }
`;
const SubscribeButton = styled(Button)`
  margin-top: auto;
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
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
      <Text $size={theme.fontSizes.large} $weight={theme.fontWeights.bold}>
        All plans
      </Text>

      <SelectSubscriptionContainer>
        {plans.map(plan => {
          return (
            <SubscriptionCard key={plan.id}>
              <Text $size="16px" $weight="700" $margin="5px 0">
                {plan.name}
              </Text>
              <Text $size="30px" $weight="700" $margin="10px 0">
                ${plan.price}/mth
              </Text>
              <Text
                $size="12px"
                $color={theme.colors.dark2}
                $margin="10px 0 20px 0">
                {plan.description}
              </Text>

              {plan.features.map(feature => (
                <FeatureContainer key={feature}>
                  <Icon
                    icon="success"
                    height={24}
                    width={24}
                    stroke={theme.colors.primary}
                  />
                  <Text key={feature} $margin="0 5px">
                    {feature}
                  </Text>
                </FeatureContainer>
              ))}
              <Hr />
              <Text
                $size={theme.fontSizes.small}
                $color={theme.colors.dark2}
                $weight="700">
                Aditional features
              </Text>
              <Text $size={theme.fontSizes.mini} $color={theme.colors.dark2}>
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
