import { makeAutoObservable } from 'mobx';
import { api, Questions as QuestionsRes } from 'api';
import { Answers } from './Answers';
import { Progress } from './Progress';
import { Timer } from './Timer';

export class Questions {
  constructor() {
    makeAutoObservable(this);
  }

  answers = new Answers();
  progress = new Progress();
  timer = new Timer();

  items = new Array<QuestionsRes[number]>();

  get currentQuestion() {
    return this.items[this.progress.currentQuestionNumber];
  }

  get isSubmitButtonDisabled() {
    if (!this.currentQuestion) return true;
    return !this.answers.stack[this.progress.currentQuestionNumber];
  }

  #setItems = (data: QuestionsRes) => {
    this.items = data;
    this.progress.setQuestionsCount(data.length);
    this.timer.initCountDown();
  }

  #handleErr = () => {
    console.error('ошибка при загрузке вопросов');
  }

  loadQuestions = () => {
    api.questions.get().then(this.#setItems).catch(this.#handleErr);
  }
}