import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Radio as AntdRadio, Space, RadioChangeEvent } from 'antd';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _ } from 'utils';

type QuestionResponse = _.Defined<QuestionsRes[number]['responses']>[number]

const renderResponse = (response: QuestionResponse) => {
  return (
    <AntdRadio value={response.id}>{response.content}</AntdRadio>
  );
}

export const Radios: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion.responses) return null;

  const firstResponseId = currentQuestion.responses[0].id;

  const [value, setValue] = useState(firstResponseId);

  const change = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  
  return (
    <AntdRadio.Group onChange={change} value={value}>
      <Space direction="vertical">
        {currentQuestion.responses.map(renderResponse)}
      </Space>
    </AntdRadio.Group>
  );
});