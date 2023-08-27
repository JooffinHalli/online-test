import { makeAutoObservable } from 'mobx';
import { api, Questions as QuestionsRes } from 'api';
import { Progress } from './Progress';
import { Timer } from './Timer';

/** Для создания массивов, с последовательностью от 0 до N */
export class Questions {
  constructor() {
    makeAutoObservable(this);
  }

  progress = new Progress();
  timer = new Timer();

  items = new Array<QuestionsRes[number]>();

  get currentQuestion() {
    return this.items[this.progress.currentQuestionNumber];
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