const formatter = Intl.NumberFormat('en-gb', {
  style: 'currency',
  currency: 'GBP',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
