/** Поля формы
 * search_for=offices/atms/all [all - default] - select
 * max_results=3 [3 - default] - number
 * vehicle=foot [foot - default] - select
 * longitude=Number [Required] - number
 * latitude=Number [Required] - number
 * individual=0/1 [1 - default] - select
 */

export type FormValues = {
  search_for: string;
  max_results: number;
  vehicle: string;
  individual: number;
};

export type FormErrors = {
  search_for?: string;
  max_results?: string;
  vehicle?: string;
  individual?: string;
};

const validate = (values: FormValues) => {
  const errors: FormErrors = {};

  if (!values.search_for) {
    errors.search_for = 'Выберите тип объекта';
  }

  if (!values.max_results) {
    errors.max_results = 'Выберите количество объектов';
  } else if (values.max_results < 1 || values.max_results > 10) {
    errors.max_results = 'Количество объектов должно быть от 1 до 10';
  }

  if (!values.vehicle) {
    errors.vehicle = 'Выберите тип транспорта';
  }

  if (!values.individual) {
    errors.individual = 'Выберите тип лица';
  }

  return errors;
};

export default validate;
