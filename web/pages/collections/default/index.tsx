import { useState } from 'react';

import { Alert, PageLayout4Part, Sidebar } from '@/components';
import { menu, menuTitle } from '../_menu';
import UrlInputForm from './url-input-form';
import { apiPost } from '@/utils/api-client';
import { SiteDetails } from '@/types';
import { ApiStatus } from '@/services/apiclient';
import { IAlertMessage } from '@/components/alert';


const SitesMonitoredPage = () => {
  const [siteList, setSiteList] = useState<SiteDetails[]>([]);
  const [alert, setAlert] = useState<IAlertMessage>({ message: '', type: 'success' });

  const onAlertClose = () => {
    setAlert({ message: '', type: 'success' });
  };

  const getDefaultCollection = async () => {
    const data = {
      crudRead: {
        table: 'tbl_site'
      }
    }
    const apiResponse = await apiPost('/jsonql', data);
    if (apiResponse.status !== ApiStatus.OK) {
      return setAlert({ message: "Error connecting to server", type: "error" });
    }

    // @ts-ignore
    const crudReadResult = apiResponse.result['crudRead'];

    if (typeof crudReadResult === 'string') {
      return setAlert({ message: crudReadResult, type: "error" });
    }

    setSiteList(crudReadResult);
  }

  const onPageEnter = () => {
    console.log(`Loading page data ${new Date()}`);
    getDefaultCollection();
  }

  return (
    <PageLayout4Part onPageEnter={onPageEnter} sidebar={<Sidebar title={menuTitle} menuItems={menu} />} >
      {alert.message && <Alert type={alert.type} onClose={onAlertClose}>
        {alert.message}
      </Alert>}
      <UrlInputForm collection_id={0} siteList={siteList} updateSiteList={getDefaultCollection} setAlert={setAlert} />
    </PageLayout4Part>
  );
};

export default SitesMonitoredPage;
