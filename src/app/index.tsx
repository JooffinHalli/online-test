import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Header } from './Header';
import { Progress } from './Progress';
import { Question } from './Question';
import styles from './styles.module.css';

// первичная логика начинается в классе Root

export const App: FC = observer(() => {

  return (
    <div className={styles.app}>
      <div className={styles.content}>
        <Header />
        <Progress />
        <Question />
      </div>
    </div>
  );
});