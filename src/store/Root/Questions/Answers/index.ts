import { Questions } from 'api';
import { makeAutoObservable } from 'mobx';
import { root } from 'store';
import { _ } from 'utils';

type Question = Questions[number];

export type AnswerByQuestionType = {
  'checkbox': _.Defined<Question['answers']>[number]['id'][]
  'radio': _.Defined<Question['answers']>[number]['id']
  'input': string
  'textarea': string
}

export type SubmitedAnswer = {
  type:  keyof AnswerByQuestionType
  value: AnswerByQuestionType[Question['type']];
}

const validateString = (value: string) => !value.trim().length;

const checkerByType: { [K in keyof AnswerByQuestionType]: (value: AnswerByQuestionType[K]) => boolean } = {
  'checkbox': (value) => !value.length,
  'radio': () => false,
  'input': validateString,
  'textarea': validateString
}

/** Класс для работы с ответами */
export class Answers {
  constructor() {
    makeAutoObservable(this);
  }

  /** сюда складываются выбранные ответы */
  stack = new Array<SubmitedAnswer>();

  /** Выбранный ответ текущего вопроса */
  get currentValue() {
    const value = this.stack[root.questions.progress.currentQuestionNumber];
    if (!value) return null;
    return value.value;
  }

  set = (answer: SubmitedAnswer) => {
    const { type, value } = answer;
    const validator: Function = checkerByType[type];
    const thereIsNoAnswer = validator(value);
    if (thereIsNoAnswer) {
      this.stack.pop();
      sessionStorage.removeItem(
        `${root.questions.progress.currentQuestionNumber}`
      );
      return;
    }
    sessionStorage.setItem(
      `${root.questions.progress.currentQuestionNumber}`,
      JSON.stringify(answer)
    );
    this.stack[root.questions.progress.currentQuestionNumber] = answer;
  }

}