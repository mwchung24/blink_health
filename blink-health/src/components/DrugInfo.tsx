import {TDrug} from '../utils/types';
import styles from './DrugInfo.module.css';

export const DrugInfo = ({drug}: {drug: TDrug}) => {
  return (
    <div className={styles.drugInfo}>
      <span className={styles.nameOfDrug}>Name of Drug</span>
      <div className={styles.idWrapper}>
        <span>Id: </span>
        <span>{drug?.rxcui}</span>
      </div>
      <div className={styles.nameWrapper}>
        <span>Name: </span>
        <span>{drug?.name}</span>
      </div>
      <div className={styles.synonymWrapper}>
        <span>Synonym: </span>
        <span>{drug?.synonym}</span>
      </div>
    </div>
  );
};
