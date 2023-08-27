import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Parsed } from 'components';
import { Responses } from './Responses';
import styles from './styles.module.css';

const questionTypeText = {
  'radio': 'Выберите один вариант',
  'checkbox': 'Можно выбрать несколько вариантов',
  'input': 'Впишите ответ',
  'textarea': 'Напишите подробный ответ'
} as const;

export const Question: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion) return null;
  
  const info = questionTypeText[currentQuestion.type];

  return (
    <div className={styles.questionWrapper}>

      <div className={styles.questionHeader}>
        <Parsed>{currentQuestion.question}</Parsed> {info}
      </div>

      {currentQuestion.responses && <Responses items={currentQuestion.responses} />}

    </div>
  );
});