import { PageLayout4Part, Sidebar } from '@/components';

import { menu, menuTitle } from '../menu';
import UrlInputForm from './url-input-form';


const SitesMonitoredPage = () => {
  return (
    <PageLayout4Part sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <UrlInputForm />
    </PageLayout4Part>
  );
};

export default SitesMonitoredPage;
