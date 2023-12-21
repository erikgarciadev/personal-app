export const COLLECTIONS = Object.freeze({
  WEIGHTS: 'weights',
  FINANCE: 'financial_history',
});

export const TYPES_FINANCE = Object.freeze({
  INCOME: 'income',
  EXPENSE: 'expense',
});

export const FREQUENCIES = Object.freeze({
  DAILY: 'daily',
  MONTHLY: 'monthly',
  ANUAL: 'annual',
});

export const options_frequencies = [
  {
    value: FREQUENCIES.DAILY,
    label: 'Diario',
  },
  {
    value: FREQUENCIES.MONTHLY,
    label: 'Mensual',
  },
  {
    value: FREQUENCIES.ANUAL,
    label: 'Anual',
  },
];

export const options_types = [
  {
    value: TYPES_FINANCE.INCOME,
    label: 'Ingreso',
  },
  {
    value: TYPES_FINANCE.EXPENSE,
    label: 'Gasto',
  },
];
