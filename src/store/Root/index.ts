import { Questions } from './Questions';

export class Root {
  constructor() {
    this.questions.loadQuestions();
  }

  questions = new Questions();
}