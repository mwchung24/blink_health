import {Link} from 'react-router-dom';
import styles from './Header.module.css';

export const Header = ({title}: {title: string}) => {
  return (
    <div className={styles.header}>
      <div className={styles.linkWrapper}>
        <Link className={styles.headerLink} to={'/drugs/search'}>
          Blink Takehome
        </Link>
      </div>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
