import { FC, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Checkbox, Space } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Questions as QuestionsRes } from 'api';
import { root } from 'store';
import { _, ea } from 'utils';

type QuestionResponse = _.Defined<QuestionsRes[number]['responses']>[number]

const renderResponse = (response: QuestionResponse) => {
  return (
    <Checkbox value={response.id}>{response.content}</Checkbox>
  );
}

export const Checkboxes: FC = observer(() => {
  const { currentQuestion } = root.questions;

  if (!currentQuestion.responses) return null;

  const [values, setValues] = useState<CheckboxValueType[]>(ea);
  
  return (
    <Checkbox.Group value={values} onChange={setValues}>
      <Space direction="vertical">
        {currentQuestion.responses.map(renderResponse)}
      </Space>
    </Checkbox.Group>
  );
});