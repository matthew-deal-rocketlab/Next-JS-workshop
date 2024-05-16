import { GetServerSideProps } from 'next'

type Invoice = {
  id: number
  amount: number
  date: string
}

type MockApiResponse = {
  invoices: Invoice[]
}

type Props = {
  data: MockApiResponse
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const data: MockApiResponse = {
    invoices: [
      { id: 1, amount: 500, date: '2024-05-01' },
      { id: 2, amount: 300, date: '2024-05-02' },
      { id: 3, amount: 700, date: '2024-05-03' },
    ],
  }

  return {
    props: {
      data,
    },
  }
}

export default function Test({ data }: Props) {
  if (!data.invoices) return <div>Loading...</div>

  return (
    <section>
      <h1>Invoices</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  )
}
