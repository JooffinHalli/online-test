import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import styles from './styles.module.css';

const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
  if (!e.target.value.trim().length) {
    root.questions.answers.stack.pop();
    return;
  }
  root.questions.answers.stack[root.questions.progress.currentQuestionNumber] = e.target.value;
};

export const Textarea: FC = observer(() => {
  const { answers, progress } = root.questions;

  const value = answers.getTyped<'textarea'>(progress.currentQuestionNumber);

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