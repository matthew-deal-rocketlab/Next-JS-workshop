import {
  PageLayout4Part,
  SelectSubscription,
  Sidebar,
  ResumeSubscription,
} from '@/components';
import { menuTitle, menu } from '../_menu';
import { ISubscription } from '@/components/select-subscription';
import { IResumeSubscription } from '@/components/resume-subscription';

const ManageSubscriptionPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />}>
      <ResumeSubscription {...resumeProps} />
      <SelectSubscription plans={plans} />
      {/*         <PlansDetails/>     */}
    </PageLayout4Part>
  );
};

export default ManageSubscriptionPage;

// Mock Data
const plans: ISubscription[] = [
  {
    id: 1,
    name: 'Starter',
    price: 9,
    features: [
      '5 URL',
      'Min Frequency 1 screenshot per day',
      'Email Notifications',
    ],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, autem quos voluptatum eveniet perferendis vero. Sequi officiis nemo sit doloribus numquam maiores sed, iure aut, consequuntur consequatur dolor beatae saepe?',
  },
  {
    id: 2,
    name: 'Medium',
    price: 59,
    features: [
      '20 URL',
      'Min Frequency 1 screenshot per hour',
      'Email Notifications',
    ],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, autem quos voluptatum eveniet perferendis vero. Sequi officiis nemo sit doloribus numquam maiores sed, iure aut, consequuntur consequatur dolor beatae saepe?',
  },
  {
    id: 3,
    name: 'Premium',
    price: 99,
    features: [
      '50 URL',
      'Min Frequency 1 screenshot per hour',
      'Email Notifications',
      'SMS Notifications',
    ],
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus, autem quos voluptatum eveniet perferendis vero. Sequi officiis nemo sit doloribus numquam maiores sed, iure aut, consequuntur consequatur dolor beatae saepe?',
  },
];
const resumeProps: IResumeSubscription = {
  name: 'Premium',
  price: 99,
  nextPaymentDate: '2021-01-01',
  onSubscribe: () => console.log('onSubscribe'),
};
