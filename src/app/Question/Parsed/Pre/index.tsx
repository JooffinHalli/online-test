import { FC } from 'react';
import styles from './styles.module.css';

export const Pre: FC<{
  
  children: string

}> = ({ children }) => {

  const [beforePre, next] = children.split('<pre>');
  const [between, after] = next.split('</pre>');
  
  return (
    <div>
      {beforePre}
      <pre className={styles.pre}>
        {between}
      </pre>
      {after}
    </div>
  );
}