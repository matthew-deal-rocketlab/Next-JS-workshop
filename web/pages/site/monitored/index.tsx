import { PageLayout4Part, Sidebar } from '@/components';

import { menu, menuTitle } from '../menu';

const SitesMonitoredPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <div />
    </PageLayout4Part>
  );
};

export default SitesMonitoredPage;
