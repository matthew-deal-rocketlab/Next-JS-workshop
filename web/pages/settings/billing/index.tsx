import { PageLayout4Part, Sidebar } from '@/components';
import BillingForm from './billing-form';
import { menuTitle, menu } from '../_menu';

const ProfileBillingPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <BillingForm />
    </PageLayout4Part>
  );
};

export default ProfileBillingPage;
