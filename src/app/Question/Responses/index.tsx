import { FC } from 'react';
import { Questions as QuestionsRes } from 'api';
import { Response } from './Response';

const renderResponse = (response: QuestionsRes[number]['responses'][number]) => {
  return <Response key={response.id} response={response} />
}

export const Responses: FC<{

  items: QuestionsRes[number]['responses']

}> = ({ items }) => {
  
  return (
    <div>
      {items.map(renderResponse)}
    </div>
  );
};