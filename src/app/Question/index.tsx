import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Parsed } from 'components';
import { Checkboxes } from './Checkboxes';
import { Radios } from './Radios';
import { Input } from './Input';
import { Textarea } from './Textarea';
import styles from './styles.module.css';

const questionTypeText = {
  'radio': 'Выберите один вариант',
  'checkbox': 'Можно выбрать несколько вариантов',
  'input': 'Впишите ответ',
  'textarea': 'Напишите подробный ответ'
} as const;

const questionTypeComponent = {
  'radio': () => <Radios />,
  'checkbox': () => <Checkboxes />,
  'input': () => <Input />,
  'textarea': () => <Textarea />,
} as const;

export const Question: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion) return null;
  
  const info = questionTypeText[currentQuestion.type];
  const ResComponent = questionTypeComponent[currentQuestion.type];

  return (
    <div className={styles.questionWrapper}>

      <div className={styles.questionHeader}>
        <Parsed>{currentQuestion.question}</Parsed> {info}
      </div>

      <ResComponent />

    </div>
  );
});