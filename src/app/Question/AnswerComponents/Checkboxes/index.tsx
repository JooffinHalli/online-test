import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Space } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { AnswerByQuestionType } from 'store/Root/Questions/Answers';
import { _ } from 'utils';

type QuestionAnswer = _.Defined<QuestionsRes[number]['answers']>[number]

const renderAnswer = ({ id, content }: QuestionAnswer) => {
  return (
    <Checkbox key={id} value={id}>{content}</Checkbox>
  );
}

const Options: FC = observer(() => {
  if (!root.questions.currentQuestion.answers) return null;
  return (
    <Space direction="vertical">
      {root.questions.currentQuestion.answers.map(renderAnswer)}
    </Space>
  )
});

const change = (values: CheckboxValueType[]) => {
  root.questions.answers.set({ type: 'checkbox', value: values.map(Number) });
};

const defaultState = new Array<CheckboxValueType>();

export const Checkboxes: FC = observer(() => {
  const { answers } = root.questions;

  const values = answers.currentValue as AnswerByQuestionType['checkbox'] || defaultState;
  
  return (
    <Checkbox.Group value={values} onChange={change}>
      <Options />
    </Checkbox.Group>
  );
});