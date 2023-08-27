import { FC } from 'react';
import styles from './styles.module.css';

export const Step: FC<{

  isSelected: boolean;
  wasPassed: boolean;

}> = ({ isSelected, wasPassed }) => {
  

  return (
    <div className={styles.step} />
  );
}