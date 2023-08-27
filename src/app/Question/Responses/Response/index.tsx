import { FC } from 'react';
import { Questions } from 'api';
import { _ } from 'utils';
import { Checkbox } from './Checkbox';

export const Response: FC<{

  response: _.Defined<Questions[number]['responses']>[number]

}> = ({ response }) => {

  return (
    <div>
      <Checkbox />
      {response.content}
    </div>
  );
};