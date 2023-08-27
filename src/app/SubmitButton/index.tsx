import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { cn } from 'utils';
import { root } from 'store';
import styles from './styles.module.css';

export const SubmitButton: FC = observer(() => {

  const classes = cn(
    styles.submitButton,
    root.questions.isSubmitButtonDisabled && styles.disabled
  );

  return (
    <button
      className={classes}
      disabled={true}
    >
      Ответить
    </button>
  );
})