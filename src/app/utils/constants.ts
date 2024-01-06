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

export const income_categories = [
  { label: 'Salario', value: 'salary' },
  { label: 'Ingresos Adicionales', value: 'additional_income' },
  { label: 'Inversiones', value: 'investments' },
  { label: 'Negocio Propio', value: 'own_business' },
  { label: 'Alquileres', value: 'rentals' },
  { label: 'Subsidios y Ayudas', value: 'subsidies_and_assistance' },
  { label: 'Regalías', value: 'royalties' },
  { label: 'Ventas de Bienes', value: 'goods_sales' },
  { label: 'Bonificaciones', value: 'bonuses' },
  { label: 'Otros', value: 'other' },
];

export const expense_categories = [
  { label: 'Alimentación', value: 'food' },
  { label: 'Vivienda', value: 'housing' },
  { label: 'Transporte', value: 'transportation' },
  { label: 'Entretenimiento', value: 'entertainment' },
  { label: 'Salud', value: 'health' },
  { label: 'Educación', value: 'education' },
  { label: 'Ropa y Accesorios', value: 'clothing_and_accessories' },
  { label: 'Tecnología', value: 'technology' },
  { label: 'Viajes', value: 'travel' },
  { label: 'Deudas', value: 'debts' },
  { label: 'Donación', value: 'donation' },
  { label: 'Otros', value: 'other' },
];
