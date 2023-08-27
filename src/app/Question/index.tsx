import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Responses } from './Responses';
import styles from './styles.module.css';

const Pre: FC<{ children: string }> = ({ children }) => {
  const [beforePre, next] = children.split('<pre>');
  const [between, after] = next.split('</pre>');
  return (
    <div>{beforePre}<pre>{between}</pre>{after}</div>
  );
}

export const Question: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion) return null;
  
  const info = currentQuestion.isMulti
    ? 'Выберите несколько вариантов'
    : 'Выберите один вариант';

  const question = currentQuestion.question.includes('<pre>')
    ? <Pre>{currentQuestion.question}</Pre>
    : currentQuestion.question;

  return (
    <div className={styles.questionWrapper}>
      <div className={styles.questionHeader}>
        {question} {info}
      </div>
      <Responses items={currentQuestion.responses} />
    </div>
  );
});