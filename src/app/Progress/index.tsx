import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { Step } from './Step';
import styles from './styles.module.css';

const renderStep = (stepNumber: number) => {
  return (
    <Step
      key={stepNumber}
      id={stepNumber}
    />
  );
}

export const Progress: FC = observer(() => {
  const { items } = root.questions.progress;

  return (
    <div className={styles.steps}>
      {items.map(renderStep)}
    </div>
  );
});