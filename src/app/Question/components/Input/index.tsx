import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import { AnswerByQuestionType } from 'store/Root/Questions/Answers';
import styles from './styles.module.css';

const change = (e: ChangeEvent<HTMLInputElement>) => {
  root.questions.answers.set({ type: 'input', value: e.target.value });
};

export const Input: FC = observer(() => {
  const { answers } = root.questions;

  const value = answers.currentValue as AnswerByQuestionType['input'];
  
  return (
    <AntdInput
      value={value}
      className={styles.input}
      placeholder='Напишите ваш ответ'
      onChange={change}
    />
  );
});