export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString('en-AU', {
    style: 'currency',
    currency: 'AUD',
  });
};
