import { PageLayout4Part, Sidebar } from '@/components';

import UserDetailForm from './user-detail-form';
import { menuTitle, menu } from '../_menu';

const ProfileUpdatePage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <UserDetailForm />
    </PageLayout4Part>
  );
};

export default ProfileUpdatePage;
