import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { ConfigProvider, Result as AntdResult } from 'antd';
import { antdTheme } from 'utils';
import { Header } from './Header';
import { Progress } from './Progress';
import { Question } from './Question';
import { SubmitButton } from './SubmitButton';
import styles from './styles.module.css';
import { root } from 'store';

// первичная логика начинается в классе Root

const Content = [
  <Header />,
  <Progress />,
  <Question />,
  <SubmitButton />
];

const Result = (
  <AntdResult
    icon={<></>}
    status='success'
    title='Спасибо!'
    subTitle='Тест закончен'
  />
);

export const App: FC = observer(() => {

  return (
    <ConfigProvider theme={antdTheme}>
      <div className={styles.app}>
        <div className={styles.content}>
          {root.testIsFinished ? Result : Content}
        </div>
      </div>
    </ConfigProvider>
  );
});