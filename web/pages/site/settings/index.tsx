import { PageLayout4Part, Sidebar } from '@/components';

import { menu, menuTitle } from '../menu';
import SitesSettingsForm from './site-settings-form';

const SitesSettingsPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <SitesSettingsForm />
    </PageLayout4Part>
  );
};

export default SitesSettingsPage;
