import { Questions } from 'api';
import { makeAutoObservable } from 'mobx';
import { _ } from 'utils';

type Question = Questions[number];

type AnswerByQuestionType = {
  'checkbox': _.Defined<Question['answers']>[number]['id'][]
  'radio': _.Defined<Question['answers']>[number]['id']
  'input': string
  'textarea': string
}

type SubmitedAnswer = AnswerByQuestionType[Question['type']];

/** Класс для работы с ответами */
export class Answers {
  constructor() {
    makeAutoObservable(this);
  }

  /** сюда складываются выбранные ответы */
  stack = new Array<SubmitedAnswer>();

  getTyped = <T extends keyof AnswerByQuestionType>(index: number) => {
    return this.stack[index] as AnswerByQuestionType[T];
  }
}