import { Questions } from 'api';
import { makeAutoObservable } from 'mobx';
import { _ } from 'utils';

type Question = Questions[number];
type QuestionId = Question['id'];

type AnswerByQuestionType = {
  'checkbox': _.Defined<Question['answers']>[number]['id'][]
  'radio': _.Defined<Question['answers']>[number]['id']
  'input': string
  'textarea': string
}

type AnswerInStorage = AnswerByQuestionType[Question['type']];

/** Класс для работы с ответами */
export class Answers {
  constructor() {
    makeAutoObservable(this);
  }

  /** сюда складываются выбранные ответы */
  storage = new Map<QuestionId, AnswerInStorage>();

  getTyped = <T extends keyof AnswerByQuestionType>(questionId: QuestionId) => {
    return this.storage.get(questionId) as AnswerByQuestionType[T];
  }
}