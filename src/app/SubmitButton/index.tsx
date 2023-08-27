import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import { cn } from 'utils';
import styles from './styles.module.css';

export const SubmitButton: FC = observer(() => {

  const classes = cn(
    styles.submitButton,
    root.questions.isSubmitButtonDisabled && styles.disabled
  );

  return (
    <button
      className={classes}
      disabled={root.questions.isSubmitButtonDisabled}
      onClick={root.questions.progress.goToNextQuestion}
    >
      Ответить
    </button>
  );
})