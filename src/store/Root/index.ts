import { api } from 'api';
import { Questions } from './Questions';
import { SubmitedAnswer } from './Questions/Answers';

export class Root {
  constructor() {
    this.questions.loadQuestions();
    this.#fillStackFromSS();
  }

  get testIsFinished() {
    const { progress, items } = this.questions;
    const isFinished = items.length && progress.currentQuestionNumber === items.length;
    if (isFinished) {
      api.questions.post({
        body: { answers: this.questions.answers.stack.map(({ value }) => value) }
      }).catch(console.error);
    }
    return isFinished;
  }

  #fillStackFromSS = () => {
    const newStack = new Array<SubmitedAnswer>();
    for (const key in sessionStorage) {
      if (!sessionStorage.hasOwnProperty(key)) continue;
      newStack[+key] = JSON.parse(sessionStorage.getItem(key)!)
    }
    this.questions.answers.stack = newStack;
    this.questions.progress.currentQuestionNumber = newStack.length;
  }

  questions = new Questions();
}