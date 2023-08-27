import { makeAutoObservable } from 'mobx';

/** класс для работы с таймером */
export class Timer {
  constructor() {
    makeAutoObservable(this);
  }

  #duration = 60 * 15 // 15 minutes

  #addLeadingZero = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
  }

  timer = '15:00';
  timeIsOver = false;

  initCountDown = () => {
    const timer = setInterval(() => {
      this.#duration--;
      const minutes = Math.floor(this.#duration / 60);
      const seconds = this.#duration % 60;
      this.timer = `${this.#addLeadingZero(minutes)}:${this.#addLeadingZero(seconds)}`;
      if (!minutes && !seconds) {
        clearInterval(timer);
        this.timeIsOver = true;
      }
    }, 1000);
  }
}