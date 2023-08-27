import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Parsed } from 'components';
import { questionTypeComponent, questionTypeText } from './constants';
import styles from './styles.module.css';

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