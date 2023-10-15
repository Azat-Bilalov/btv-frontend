import { useFormik } from 'formik';
import { Button } from '@/shared/ui/button';
import styles from './index.module.scss';
import { ButtonType } from '@/shared/ui/button/types';
import validate from './validate';
import { useMapStore } from '../../model';
import { observer } from 'mobx-react-lite';

const ClosestForm = () => {
  /** Поля формы
   * search_for=offices/atms/all [all - default] - select
   * max_results=3 [3 - default] - number
   * vehicle=foot [foot - default] - select
   * longitude=Number [Required] - number
   * latitude=Number [Required] - number
   * individual=0/1 [1 - default] - select
   */

  const { location, closestTimes, fetchClosest } = useMapStore();

  const formik = useFormik({
    initialValues: {
      search_for: 'all',
      max_results: 3,
      vehicle: 'foot',
      longitude: '',
      latitude: '',
      individual: 1,
    },
    validate,
    onSubmit: (values) => {
      if (location === null) return;
      fetchClosest({
        ...values,
        latitude: location.lat,
        longitude: location.lng,
      });
    },
  });

  if (location === null) return null;

  if (closestTimes !== null) return null;

  return (
    <form onSubmit={formik.handleSubmit} className={styles.closestForm}>
      <label className={styles.closestFormLabel} htmlFor="search_for">
        Искать
      </label>
      <select
        id="search_for"
        name="search_for"
        onChange={formik.handleChange}
        value={formik.values.search_for}
        className={styles.closestFormSelect}
      >
        <option value="offices">Отделения</option>
        <option value="atms">Банкоматы</option>
        <option value="all">Отделения и банкоматы</option>
      </select>
      {formik.errors.search_for && formik.touched.search_for ? (
        <div className={styles.closestFormError}>
          {formik.errors.search_for}
        </div>
      ) : null}

      <label className={styles.closestFormLabel} htmlFor="max_results">
        Количество результатов
      </label>
      <input
        id="max_results"
        name="max_results"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.max_results}
        className={styles.closestFormInput}
      />
      {formik.errors.max_results && formik.touched.max_results ? (
        <div className={styles.closestFormError}>
          {formik.errors.max_results}
        </div>
      ) : null}

      <label className={styles.closestFormLabel} htmlFor="vehicle">
        Вариант маршрута
      </label>
      <select
        id="vehicle"
        name="vehicle"
        onChange={formik.handleChange}
        value={formik.values.vehicle}
        className={styles.closestFormSelect}
      >
        <option value="foot">Пеший</option>
        <option value="car">Автомобиль</option>
      </select>
      {formik.errors.vehicle && formik.touched.vehicle ? (
        <div className={styles.closestFormError}>{formik.errors.vehicle}</div>
      ) : null}

      <label className={styles.closestFormLabel} htmlFor="individual">
        Лицо
      </label>
      <select
        id="individual"
        name="individual"
        onChange={formik.handleChange}
        value={formik.values.individual}
        className={styles.closestFormSelect}
      >
        <option value={0}>Юридическое</option>
        <option value={1}>Физическое</option>
      </select>
      {formik.errors.individual && formik.touched.individual ? (
        <div className={styles.closestFormError}>
          {formik.errors.individual}
        </div>
      ) : null}
      <br />
      <Button type={ButtonType.Primary} className={'bg-sky-500'} submit>
        Найти
      </Button>
    </form>
  );
};

export default observer(ClosestForm);
