import { Alerts } from './Alerts';
import { Questions } from './Questions';

export class Root {
  constructor() {
    this.questions.loadQuestions();
  }

  alerts = new Alerts();
  questions = new Questions();
}