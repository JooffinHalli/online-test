import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Radio as AntdRadio, Space, RadioChangeEvent } from 'antd';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { AnswerByQuestionType } from 'store/Root/Questions/Answers';
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
  root.questions.answers.set({ type: 'radio', value: e.target.value });
};

export const Radios: FC = observer(() => {
  const { answers } = root.questions;

  const value = answers.currentValue as AnswerByQuestionType['radio'];
  
  return (
    <AntdRadio.Group value={value} onChange={change}>
      <Options />
    </AntdRadio.Group>
  );
});