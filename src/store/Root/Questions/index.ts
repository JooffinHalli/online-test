import { makeAutoObservable } from 'mobx';
import { api, Questions as QuestionsRes } from 'api';
import { Progress } from './Progress';

export class Questions {
  constructor() {
    makeAutoObservable(this);
  }

  progress = new Progress();

  items = new Array<QuestionsRes[number]>();

  get currentQuestion() {
    return this.items[this.progress.currentQuestionNumber];
  }

  #setItems = (data: QuestionsRes) => {
    this.items = data;
    this.progress.setQuestionsCount(data.length);
  }

  loadQuestions = () => {
    api.questions.get().then(this.#setItems).catch(() => {
      console.error('ошибка при загрузке вопросов')
    });
  }
}