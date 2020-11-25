import { Injectable } from '@angular/core';
import { Stopwatch } from './stopwatch';

@Injectable({
  providedIn: 'root',
})
export class StopwatchService {
  constructor() {}

  saveState(time: Date, recordList: Date[]): void {
    localStorage.setItem(
      'stopwatch',
      JSON.stringify({ time, recordList, date: new Date() })
    );
  }

  getState(): Stopwatch | null {
    const data = JSON.parse(localStorage.getItem('stopwatch'));
    if (data) {
      const time: Date = new Date(data.time);
      const recordList: Date[] =
        data.recordList.length === 0
          ? data.recordList
          : data.recordList.map((time) => new Date(time));
      const date: Date = new Date(data.date);
      return { time, recordList, date };
    } else {
      return null;
    }
  }

  clearState(): void {
    localStorage.clear();
  }
}
