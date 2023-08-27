import { FC, ChangeEvent } from 'react';
import { observer } from 'mobx-react-lite';
import { Input as AntdInput } from 'antd';
import { root } from 'store';
import styles from './styles.module.css';

export const Textarea: FC = observer(() => {
  const { currentQuestion, answers } = root.questions;

  const change = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!e.target.value.trim().length) {
      answers.storage.delete(currentQuestion.id);
      return;
    }
    answers.storage.set(currentQuestion.id, e.target.value);
  };

  const value = answers.getTyped<'textarea'>(currentQuestion.id);

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