import { api } from 'api';
import { Questions } from './Questions';

export class Root {
  constructor() {
    this.questions.loadQuestions();
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

  questions = new Questions();
}