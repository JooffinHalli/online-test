import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Space } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _, ea } from 'utils';

type QuestionAnswer = _.Defined<QuestionsRes[number]['answers']>[number]

const renderAnswer = (response: QuestionAnswer) => {
  return (
    <Checkbox value={response.id}>{response.content}</Checkbox>
  );
}

export const Checkboxes: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion.answers) return null;

  const [values, setValues] = useState<CheckboxValueType[]>(ea);
  
  return (
    <Checkbox.Group value={values} onChange={setValues}>
      <Space direction="vertical">
        {currentQuestion.answers.map(renderAnswer)}
      </Space>
    </Checkbox.Group>
  );
});