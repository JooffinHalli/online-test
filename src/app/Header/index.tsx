import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Title } from './Title';
import { Timer } from './Timer';
import styles from './styles.module.css'

export const Header: FC = observer(() => {
  
  return (
    <div className={styles.headerWrapper}>
      <Title />
      <Timer />
    </div>
  );
});