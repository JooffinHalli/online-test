import { FC } from 'react';
import { Questions } from 'api';
import * as Components from '../components';

export const questionTypeText = {
  'radio': 'Выберите один вариант',
  'checkbox': 'Можно выбрать несколько вариантов',
  'input': 'Напишите ответ',
  'textarea': 'Напишите подробный ответ'
} as const;

export const questionTypeComponent: Record<Questions[number]['type'], FC> = {
  'radio': () => <Components.Radios />,
  'checkbox': () => <Components.Checkboxes />,
  'input': () => <Components.Input />,
  'textarea': () => <Components.Textarea />
} as const;