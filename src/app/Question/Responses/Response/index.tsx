import { FC } from 'react';
import { Questions } from 'api';

export const Response: FC<{

  response: Questions[number]['responses'][number]

}> = ({ response }) => {

  return (
    <div>{response.content}</div>
  );
};