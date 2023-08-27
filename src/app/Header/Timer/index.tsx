import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './styles.module.css'

export const Timer: FC = observer(() => {

  return (
    <div className={styles.timerWrapper}>
      <div className={styles.timer}>
        11:11
      </div>
    </div>
  );
});