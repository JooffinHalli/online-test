import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Radio as AntdRadio, Space, RadioChangeEvent } from 'antd';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _ } from 'utils';

type QuestionAnswer = _.Defined<QuestionsRes[number]['answers']>[number]

const renderAnswer = ({ id, content }: QuestionAnswer) => {
  return (
    <AntdRadio key={id} value={id}>{content}</AntdRadio>
  );
}

export const Radios: FC = observer(() => {
  const { currentQuestion, answers } = root.questions;

  if (!currentQuestion.answers) return null;

  const change = (e: RadioChangeEvent) => {
    answers.storage.set(currentQuestion.id, e.target.value);
  };

  const value = answers.getTyped<'radio'>(currentQuestion.id);
  
  return (
    <AntdRadio.Group value={value} onChange={change}>
      <Space direction="vertical">
        {currentQuestion.answers.map(renderAnswer)}
      </Space>
    </AntdRadio.Group>
  );
});