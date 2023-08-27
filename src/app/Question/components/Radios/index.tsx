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
  const { currentQuestion, answers, progress } = root.questions;

  if (!currentQuestion.answers) return null;

  const change = (e: RadioChangeEvent) => {
    answers.stack[progress.currentQuestionNumber] = e.target.value;
  };

  const value = answers.getTyped<'radio'>(progress.currentQuestionNumber);
  
  return (
    <AntdRadio.Group value={value} onChange={change}>
      <Space direction="vertical">
        {currentQuestion.answers.map(renderAnswer)}
      </Space>
    </AntdRadio.Group>
  );
});