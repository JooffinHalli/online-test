import { FC } from 'react';
import { Input as AntdInput } from 'antd';
import { _ } from 'utils';
import styles from './styles.module.css';

export const Textarea: FC = () => {
  return (
    <AntdInput.TextArea
      className={styles.textarea}
      rows={4}
      placeholder='Напишите ваш ответ'
      maxLength={2000}
      size='large'
    />
  );
};