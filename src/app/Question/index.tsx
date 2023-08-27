import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Responses } from './Responses';
import styles from './styles.module.css';

export const Question: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion) return null;
  
  const info = currentQuestion.isMulti
    ? 'Выберите несколько вариантов'
    : 'Выберите один вариант';

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.questionHeader}>
        {currentQuestion.question} {info}
      </div>
      <Responses items={currentQuestion.responses} />
    </div>
  );
});