import Form from '@/components/examples/invoices/edit-form';
import Breadcrumbs from '@/components/examples/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/examples/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/example/invoices' },
          {
            label: 'Edit Invoice',
            href: `/example/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
