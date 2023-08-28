import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Questions } from 'api';
import { root } from 'store';
import * as Components from './AnswerComponents';
import { Parsed } from './Parsed';
import styles from './styles.module.css';

export const questionTypeText = {
  'radio': 'Выберите один вариант',
  'checkbox': 'Можно выбрать несколько вариантов',
  'input': 'Напишите ответ',
  'textarea': 'Напишите подробный ответ'
} as const;

export const questionTypeComponent: Record<Questions[number]['type'], FC> = {
  'radio': () => <Components.Radios />,
  'checkbox': () => <Components.Checkboxes />,
  'input': () => <Components.Input />,
  'textarea': () => <Components.Textarea />
} as const;

const space = ' ';

export const Question: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion) return null;
  
  const info = questionTypeText[currentQuestion.type];
  const ResComponent = questionTypeComponent[currentQuestion.type];

  return (
    <div className={styles.questionWrapper}>

      <div className={styles.questionHeader}>
        <Parsed>{currentQuestion.question}</Parsed>
        {space}
        {info}
      </div>

      <ResComponent />

    </div>
  );
});