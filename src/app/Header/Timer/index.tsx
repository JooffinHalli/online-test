import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { cn } from 'utils';
import styles from './styles.module.css';


export const Timer: FC = observer(() => {

  const { timer, timeIsOver } = root.questions.timer;

  return (
    <div className={styles.timerWrapper}>
      <div className={cn(styles.timer, timeIsOver && styles.over)}>
        {timer}
      </div>
    </div>
  );
});