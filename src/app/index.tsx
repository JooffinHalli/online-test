import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { root } from 'store';
import styles from './styles.module.css';
import { Docs } from 'api/docs';

const renderItem = (item: Docs['tests']['get']['res'][number]) => {
  console.log('renderItem');
  return (
    <div key={item.id}>
      {item.name}
    </div>
  )
}

const Items: FC = observer(() => {
  console.log('items');
  return root.data.map(renderItem);
});

const Button = (
  <button onClick={root.getList}>
    fetch
  </button>
);

export const App: FC = () => {
  console.log('app');

  return (
    <div className={styles.app}>
      {Button}
      <Items />
    </div>
  );
};