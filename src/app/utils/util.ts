import { TYPES_FINANCE, expense_categories, income_categories } from "./constants";

export const getFirstDayLastMonth = () => {
  const today = new Date();

  const firstDayLastMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    1
  );
  firstDayLastMonth.setHours(0, 0, 0, 0);
  return firstDayLastMonth;
};

export const getTextType = (type: string) => {
  return type === TYPES_FINANCE.EXPENSE ? 'Gasto' : 'Ingreso';
}

export const getTextCategory = (type: string, category: string) => {
  const categories =
    TYPES_FINANCE.EXPENSE === type ? expense_categories : income_categories;
  const findCategory = categories.find(
    (_category) => _category.value === category
  );
  if (findCategory) return findCategory.label;
  return '-';
}
