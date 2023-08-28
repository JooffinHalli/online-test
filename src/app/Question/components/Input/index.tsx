import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import styles from './styles.module.css';

const change = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e.target.value.trim().length) {
    root.questions.answers.stack.pop();
    return;
  }
  root.questions.answers.stack[root.questions.progress.currentQuestionNumber] = e.target.value;
};

export const Input: FC = observer(() => {
  const { answers, progress } = root.questions;

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