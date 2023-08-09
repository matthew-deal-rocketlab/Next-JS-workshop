import { useEffect } from 'react';

import { PageLayout4Part, Sidebar } from '@/components';
import { menu, menuTitle } from '../_menu';
import UrlInputForm from './url-input-form';

const SitesMonitoredPage = () => {

  const onPageEnter = () => {
    console.log('Loading page data');
  }

  return (
    <PageLayout4Part onPageEnter={onPageEnter} sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      <UrlInputForm />
    </PageLayout4Part>
  );
};

export default SitesMonitoredPage;
