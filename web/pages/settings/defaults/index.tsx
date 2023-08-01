import { PageLayout4Part, Sidebar } from '@/components';
import SettingsForm from './settings-form';
import { menuTitle, menu } from '../menu';

const ProfileSettingsPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <SettingsForm />
    </PageLayout4Part>
  );
};

export default ProfileSettingsPage;
