import { Questions } from './Questions';

export class Root {
  constructor() {
    this.questions.loadQuestions();
  }

  get testIsFinished() {
    return this.questions.progress.currentQuestionNumber === this.questions.items.length;
  }

  questions = new Questions();
}