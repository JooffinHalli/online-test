import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import { AnswerByQuestionType } from 'store/Root/Questions/Answers';
import styles from './styles.module.css';

const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
  root.questions.answers.set({ type: 'textarea', value: e.target.value });
};

export const Textarea: FC = observer(() => {
  const { answers } = root.questions;

  const value = answers.currentValue as AnswerByQuestionType['textarea'];

  return (
    <AntdInput.TextArea
      className={styles.textarea}
      value={value}
      rows={4}
      placeholder='Напишите ваш ответ'
      maxLength={2000}
      size='large'
      onChange={change}
    />
  );
});