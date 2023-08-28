import { makeAutoObservable } from 'mobx';

const TIMER_RELOAD_TIME = 'timer-reload-time';
const TIMER_RELOAD_VALUE = 'timer-reload-value';
const fifteenMinutes = 60 * 15;

/** класс для работы с таймером */
export class Timer {
  constructor() {
    makeAutoObservable(this);

    window.onbeforeunload = () => {
      sessionStorage.setItem(TIMER_RELOAD_TIME, Date.now().toString());
      sessionStorage.setItem(TIMER_RELOAD_VALUE, `${this.duration}`);
    }

    const prevTime = +(sessionStorage.getItem(TIMER_RELOAD_TIME) || 0);
    const prevSecondsLeft = +(sessionStorage.getItem(TIMER_RELOAD_VALUE) || fifteenMinutes);
    if (prevTime && prevSecondsLeft) {
      const now  = Date.now();
      const defferenceInMs = now - prevTime;
      const defferenceInSec = Math.floor(defferenceInMs / 1000);
      const newDuration = prevSecondsLeft - defferenceInSec;
      this.duration = newDuration;
    } else {
      this.duration = fifteenMinutes;
    }

  }

  duration = 0;

  #addLeadingZero = (number: number) => {
    return number < 10 ? `0${number}` : `${number}`;
  }

  timer = '';
  timeIsOver = false;

  initCountDown = () => {
    const timer = setInterval(() => {
      this.duration--;
      const minutes = Math.floor(this.duration / 60);
      const seconds = this.duration % 60;
      this.timer = `${this.#addLeadingZero(minutes)}:${this.#addLeadingZero(seconds)}`;
      if (!minutes && !seconds) {
        clearInterval(timer);
        this.timeIsOver = true;
      }
    }, 1000);
  }
}