import { FC } from 'react';
import { root } from 'store';
import { cn } from 'utils';
import styles from './styles.module.css';
import { observer } from 'mobx-react-lite';

export const Step: FC<{

  id: number;

}> = observer(({ id }) => {
  const { currentQuestionNumber, setCurrentQuestionNumber } = root.questions.progress;
  
  const classes = cn(
    styles.step,
    id === currentQuestionNumber && styles.selected,
    id < currentQuestionNumber && styles.passed,
  );

  const click = () => {
    setCurrentQuestionNumber(id);
  }

  return (
    <div
      className={classes}
      onClick={click}
    />
  );
});