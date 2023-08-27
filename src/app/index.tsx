import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ConfigProvider } from 'antd';
import { antdTheme } from 'utils';
import { Header } from './Header';
import { Progress } from './Progress';
import { Question } from './Question';
import { SubmitButton } from './SubmitButton';
import styles from './styles.module.css';

// первичная логика начинается в классе Root

export const App: FC = observer(() => {

  return (
    <ConfigProvider theme={antdTheme}>
      <div className={styles.app}>
        <div className={styles.content}>
          <Header />
          <Progress />
          <Question />
          <SubmitButton />
        </div>
      </div>
    </ConfigProvider>
  );
});