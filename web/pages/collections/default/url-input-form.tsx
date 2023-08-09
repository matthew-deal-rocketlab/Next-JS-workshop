import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { Button, Card, Form, FormInput, FormRow } from "@/components";



interface SitePage {
  url: string;
  timeout: number;
}


const initialData: SitePage[] = [
  { url: 'https://www.example.com', timeout: 30 },
  { url: 'https://www.example.com/about', timeout: 30 },
  { url: 'https://www.example.com/contact', timeout: 60 },
]


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

const UrlInputForm = () => {
  const [urlList, setUrlList] = useState<SitePage[]>([]);

  const onClickRemove = (index: number) => {
    // urlList.splice(index,1);
    urlList.splice(index, 1)
    setUrlList([...urlList]);
  }

  const onClickAdd = () => {
    let timeoutValue = parseInt(getInputElement('timeout_new').value)
    if (isNaN(timeoutValue)) timeoutValue = 30;

    const newItem: SitePage = {
      url: getInputElement('url_new').value,
      timeout: timeoutValue
    }
    setUrlList(urlList.concat(newItem));

    // clear input after adding to list
    getInputElement('url_new').value = '';
    getInputElement('timeout_new').value = '30';
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

    console.log(urls);
    console.log(timeouts);
  }

  useEffect(() => {
    setUrlList(initialData);
  }, [])

  return <Container x-name="container">
    <Card style={{ width: '700px' }}>
      <Form onSubmit={onSubmitForm}>
        <ListRow key="firstRow" x-name="ListRow">
          <ListCol>URL</ListCol>
          <ListCol>Timeout</ListCol>
          <ListCol></ListCol>
        </ListRow>

        {
          urlList.map((item, index) =>
            <ListRow key={`r${index}`} x-name="ListRow">
              <ListCol>
                <TableInput id={`url_${index}`} name={`url[${index}]`} type="text" defaultValue={item.url} />
              </ListCol>
              <ListCol>
                <TableInput id={`timeout_${index}`} name={`timeout[${index}]`} type="number" defaultValue={item.timeout} />
              </ListCol>
              <ListCol>
                <ActionButton type="button" onClick={() => onClickRemove(index)}>&#x2212;</ActionButton>
              </ListCol>
            </ListRow>)
        }

        <ListRow key="lastRow" x-name="ListRow" style={{marginTop:'20px', marginBottom: '20px'}}>
          <ListCol>
            <TableInput id={`url_new`} type="text" />
          </ListCol>
          <ListCol>
            <TableInput id={`timeout_new`} type="number" defaultValue={30}/>
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
