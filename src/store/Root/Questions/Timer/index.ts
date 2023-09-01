import { makeAutoObservable } from 'mobx';

/** Session Storage */
class SS {

  #TIMER_END_TIME = 'TIMER_END_TIME';
  getTimerEndTime = () => sessionStorage.getItem(this.#TIMER_END_TIME);
  setTimerEndTime<T extends { toString: Function }>(value: T) {
    sessionStorage.setItem(this.#TIMER_END_TIME, value.toString());
  }

  #TIMER_PREV_RELOAD_TIME = 'TIMER_PREV_RELOAD_TIME';
  getTimerPrevReloadTime = () => sessionStorage.getItem(this.#TIMER_PREV_RELOAD_TIME);
  setTimerPrevReloadTime<T extends { toString: Function }>(value: T) {
    sessionStorage.setItem(this.#TIMER_PREV_RELOAD_TIME, value.toString());
  }

}

/** класс для работы с таймером */
export class Timer {
  constructor() {
    makeAutoObservable(this);

    if (!this.#ss.getTimerEndTime()) {
      this.#ss.setTimerEndTime(this.#endTime);
      this.#setTimer(14, 59);
    } else {
      const { isFinished, minutes, seconds } = this.#countFromEnd();
      if (isFinished) {
        this.timeIsOver = true;
        return;
      }
      this.#setTimer(minutes, seconds);
    }

    window.onbeforeunload = () => {
      this.#ss.setTimerPrevReloadTime(Date.now());
    }
  }

  timer = '';
  timeIsOver = false;

  initCountDown = () => {
    const { isFinished } = this.#countFromEnd();
    if (isFinished) {
      this.timeIsOver = true;
      return;
    }
    const timer = setInterval(() => {
      const { isFinished, minutes, seconds } = this.#countFromEnd();
      if (isFinished) {
        this.timeIsOver = true;
        return clearInterval(timer);
      }
      this.#setTimer(minutes, seconds);
    }, 1000);
  }

  #ss = new SS();
  #fifteenMinutes = 1000 * 60 * 15;

  get #endTime() {
    return Date.now() + this.#fifteenMinutes;
  }
  #addLeadingZero = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
  }
  #setTimer = (min: number, sec: number) => {
    this.timer = `${this.#addLeadingZero(min)}:${this.#addLeadingZero(sec)}`;
  }
  #countFromEnd = () => {
    const end = +(this.#ss.getTimerEndTime() || this.#endTime);
    const leftSeconds = (end - Date.now()) / 1000;
    const minutes = Math.floor(leftSeconds / 60);
    const seconds = Math.floor(leftSeconds % 60);
    const isFinished = leftSeconds < 1;
    return { leftSeconds, minutes, seconds, isFinished };
  }
}