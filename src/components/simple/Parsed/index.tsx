import { FC } from 'react';
import { Pre } from './Pre';

/** Парсит строку на предмет тэгов и обрабатывает их */
export const Parsed: FC<{

  children: string

}> = ({ children }) => {

  const text = children.includes('<pre>')
    ? <Pre>{children}</Pre>
    : children;

  return (
    <>{text}</>
  );
};