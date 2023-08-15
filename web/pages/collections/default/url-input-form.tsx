import { styled } from "styled-components";

import { Card, Form, FormInput } from "@/components";
import { SiteDetails } from "@/types";
import { ApiStatus } from "@/services/apiclient";
import { apiPost } from '@/utils/api-client';
import { sleep } from "@/utils/misc";


interface IUrlInputForm {
  collection_id: number,
  siteList: SiteDetails[],
  updateSiteList: Function,
  setAlert: Function,
}

const noBorderStyle = { borderRadius: 0 };

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ListCol = styled.div``

const ListRow = styled.div`
  display: flex;
  width: 100%;
  margin-top: 3px;
  & > div:first-child {
    flex: 85%;
    padding-right: 10px;
  }
  & > div:nth-child(2) {
    flex: 10%;
    padding-right: 10px;
  }
  & > div:last-child {
    flex: 5%;
  }
`

const ActionButton = styled.button`
  display: flex;
  width: 25px;
  height: 25px;
  justify-content: center;
  place-items: center;
`

const TableInput = styled(FormInput)`
  border-radius: 0;
`

const getInputElement = (id: string) => document.getElementById(id) as HTMLInputElement

const UrlInputForm = ({ collection_id, siteList, updateSiteList, setAlert }: IUrlInputForm) => {

  const submitAdd = async (newItem: SiteDetails) => {
    const data = {
      crudCreate: {
        table: "tbl_site",
        fields: { ...newItem }
      }
    }
    const apiResponse = await apiPost('/jsonql', data);
    if (apiResponse.status !== ApiStatus.OK) {
      setAlert({ message: "Error connecting to server", type: "error" });
      return false;
    }

    // @ts-ignore
    const crudCreateResult = apiResponse.result['crudCreate'];

    if (typeof crudCreateResult === 'string') {
      setAlert({ message: crudCreateResult, type: "error" });
      return false;
    }

    return true;
  }


  const submitDelete = async (itemId: number) => {
    const data = {
      crudDelete: {
        table: "tbl_site",
        id: itemId,
      }
    }
    const apiResponse = await apiPost('/jsonql', data);
    if (apiResponse.status !== ApiStatus.OK) {
      setAlert({ message: "Error connecting to server", type: "error" });
      return false;
    }

    // @ts-ignore
    const crudCreateResult = apiResponse.result['crudCreate'];

    if (typeof crudCreateResult === 'string') {
      setAlert({ message: crudCreateResult, type: "error" });
      return false;
    }

    return true;
  }


  const onClickRemove = async (itemId: number) => {
    await submitDelete(itemId);
    sleep(1);
    await updateSiteList();
  }

  const onClickAdd = async () => {
    const newItem: SiteDetails = {
      url: getInputElement('new_url').value,
      frequency: getInputElement('new_frequency').value,
      timeout: 30,
    }
    const result = await submitAdd(newItem);
    if (!result) return;

    updateSiteList();

    // clear input after adding to list
    getInputElement('new_url').value = '';
    getInputElement('new_frequency').value = 'daily';
  }

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    const data = Object.fromEntries(new FormData(event.currentTarget))

    let urls: string[] = [];
    let timeouts: number[] = [];
    Object.keys(data).forEach(key => {
      if (key.startsWith('url[')) {
        const index = parseInt(key.replace('url[', '').replace(']', ''));
        urls[index] = data[key] as string;
      }
      if (key.startsWith('timeout[')) {
        const index = parseInt(key.replace('timeout[', '').replace(']', ''));
        timeouts[index] = parseInt(data[key] as string);
      }
    })
  }

  return <Container x-name="container">
    <Card style={{ width: '700px' }}>
      <Form onSubmit={onSubmitForm}>
        <ListRow key="firstRow" x-name="ListRow">
          <ListCol>URL</ListCol>
          <ListCol>Frequency</ListCol>
          <ListCol></ListCol>
        </ListRow>

        {
          siteList.map((item, index) =>
            <ListRow key={`r${item.id}`} x-name="ListRow">
              <ListCol>
                <TableInput id={`url_${index}`} name={`url[${index}]`} type="text" defaultValue={item.url} />
              </ListCol>
              <ListCol>
                <TableInput id={`timeout_${index}`} name={`timeout[${index}]`} type="text" defaultValue={item.frequency} />
              </ListCol>
              <ListCol>
                <ActionButton type="button" onClick={() => onClickRemove(item.id ?? 0)}>&#x2212;</ActionButton>
              </ListCol>
            </ListRow>)
        }

        <ListRow key="lastRow" x-name="ListRow" style={{ marginTop: '20px', marginBottom: '20px' }}>
          <ListCol>
            <TableInput id={`new_url`} type="text" />
          </ListCol>
          <ListCol>
            <TableInput id={`new_frequency`} type="text" defaultValue='daily' />
          </ListCol>
          <ListCol>
            <ActionButton type="button" onClick={onClickAdd}>&#x2795;</ActionButton>
          </ListCol>
        </ListRow>
      </Form >
    </Card>
  </Container>
}

export default UrlInputForm;
