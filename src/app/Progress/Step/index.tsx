import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { cn } from 'utils';
import styles from './styles.module.css';

export const Step: FC<{

  id: number

}> = observer(({ id }) => {
  const { currentQuestionNumber } = root.questions.progress;
  
  const classes = cn(
    styles.step,
    id === currentQuestionNumber && styles.selected,
    id < currentQuestionNumber && styles.passed,
  );

  return (
    <div className={classes} />
  );
});