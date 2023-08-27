import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import styles from './styles.module.css';

export const Input: FC = observer(() => {
  const { currentQuestion, answers } = root.questions;

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim().length) {
      answers.storage.delete(currentQuestion.id);
      return;
    }
    answers.storage.set(currentQuestion.id, e.target.value);
  };

  const value = answers.getTyped<'input'>(currentQuestion.id);
  
  return (
    <AntdInput
      value={value}
      className={styles.input}
      placeholder='Напишите ваш ответ'
      onChange={change}
    />
  );
});