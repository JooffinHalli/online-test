import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import styles from './styles.module.css';

export const Input: FC = observer(() => {
  const { answers, progress } = root.questions;

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value.trim().length) {
      answers.stack.pop();
      return;
    }
    answers.stack[progress.currentQuestionNumber] = e.target.value;
  };

  const value = answers.getTyped<'input'>(progress.currentQuestionNumber);
  
  return (
    <AntdInput
      value={value}
      className={styles.input}
      placeholder='Напишите ваш ответ'
      onChange={change}
    />
  );
});