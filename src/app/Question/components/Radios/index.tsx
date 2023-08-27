import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Radio as AntdRadio, Space, RadioChangeEvent } from 'antd';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _ } from 'utils';

type QuestionAnswer = _.Defined<QuestionsRes[number]['answers']>[number]

const renderAnswer = (answer: QuestionAnswer) => {
  return (
    <AntdRadio value={answer.id}>{answer.content}</AntdRadio>
  );
}

export const Radios: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion.answers) return null;

  const [value, setValue] = useState();

  const change = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };
  
  return (
    <AntdRadio.Group onChange={change} value={value}>
      <Space direction="vertical">
        {currentQuestion.answers.map(renderAnswer)}
      </Space>
    </AntdRadio.Group>
  );
});