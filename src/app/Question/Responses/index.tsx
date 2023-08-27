import { FC } from 'react';
import { Questions as QuestionsRes } from 'api';
import { _ } from 'utils';
import { Response } from './Response';

type QuestionResponses = _.Defined<QuestionsRes[number]['responses']>;

const renderResponse = (response: QuestionResponses[number]) => {
  return <Response key={response.id} response={response} />
}

export const Responses: FC<{

  items: QuestionResponses

}> = ({ items }) => {
  
  return (
    <div>
      {items.map(renderResponse)}
    </div>
  );
};