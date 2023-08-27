import { makeAutoObservable } from 'mobx';

/** класс для работы с прогрессом */
export class Progress {
  constructor() {
    makeAutoObservable(this);
  }

  /** переходя между тестами инкрементируем или дикрементируем это число */
  currentQuestionNumber = 0;
  /** количество заданий в тесте */
  questionsCount = 0;

  /** массив, чтобы проитерироваться по нему в компоненте */
  get items() {
    return Array.from({ length: this.questionsCount }, this.#sequenceMapper);
  }

  #sequenceMapper = (value: number, i: number) => i;

  goToNextQuestion = () => {
    this.currentQuestionNumber++;
  }

  setQuestionsCount = (count: number) => {
    this.questionsCount = count;
  }
}