import { FC, useEffect } from 'react';
import styles from './styles.module.css';

export const App: FC = () => {

  useEffect(() => console.log(1234), []);

  return (
    <div className={styles.app}>App 1</div>
  );
}