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

const Options: FC = observer(() => {
  if (!root.questions.currentQuestion.answers) return null;
  return (
    <Space direction="vertical">
      {root.questions.currentQuestion.answers.map(renderAnswer)}
    </Space>
  );
});

const change = (e: RadioChangeEvent) => {
  root.questions.answers.stack[root.questions.progress.currentQuestionNumber] = e.target.value;
};

export const Radios: FC = observer(() => {
  const { answers, progress } = root.questions;

  const value = answers.getTyped<'radio'>(progress.currentQuestionNumber);
  
  return (
    <AntdRadio.Group value={value} onChange={change}>
      <Options />
    </AntdRadio.Group>
  );
});