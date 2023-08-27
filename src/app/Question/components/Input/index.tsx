import { FC } from 'react';
import { Input as AntdInput } from 'antd';
import { _ } from 'utils';
import styles from './styles.module.css';

export const Input: FC = () => {
  return (
    <AntdInput
      className={styles.input}
      placeholder='Напишите ваш ответ'
    />
  );
};