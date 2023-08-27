import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Space } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _ } from 'utils';

type QuestionAnswer = _.Defined<QuestionsRes[number]['answers']>[number]

const renderAnswer = ({ id, content }: QuestionAnswer) => {
  return (
    <Checkbox key={id} value={id}>{content}</Checkbox>
  );
}

const defaultState = new Array<CheckboxValueType>();

export const Checkboxes: FC = observer(() => {
  const { currentQuestion, answers, progress } = root.questions;

  if (!currentQuestion.answers) return null;

  const change = (values: CheckboxValueType[]) => {
    if (!values.length) {
      answers.stack.pop();
      return;
    }
    answers.stack[progress.currentQuestionNumber] = values.map(Number);
  };

  const values = answers.getTyped<'checkbox'>(progress.currentQuestionNumber) || defaultState;
  
  return (
    <Checkbox.Group value={values} onChange={change}>
      <Space direction="vertical">
        {currentQuestion.answers.map(renderAnswer)}
      </Space>
    </Checkbox.Group>
  );
});