import { FC } from 'react';
import styles from './styles.module.css';

export const SubmitButton: FC = () => {
  return (
    <button className={styles.submitButton}>Ответить</button>
  );
}