import { Component, OnInit } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Stopwatch } from '../stopwatch';
import { StopwatchService } from '../stopwatch.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(private stopwatchService: StopwatchService) {}

  private countIntervals: number = 0;
  private timeDifference: number = 0;
  private offset: number = 0;
  private since: number;
  private stop$: Subject<boolean> = new Subject<boolean>();

  public time: Date = new Date(0);
  public blink: boolean = false;
  public recordList: Date[] = [];
  public isCounting: boolean = false;

  ngOnInit(): void {
    const state: Stopwatch | null = this.stopwatchService.getState();

    if (state) {
      this.calculateState(state);
    }
  }

  handleToggleCounter(): void {
    this.isCounting = !this.isCounting;

    if (this.isCounting) {
      this.stopwatchService.saveState(this.time, this.recordList);
      this.since = performance.now();
      interval(10)
        .pipe(takeUntil(this.stop$))
        .subscribe(() => {
          this.calculateTime();
        });
    } else {
      this.stop$.next(true);
      this.offset = this.time.getTime();
      this.stopwatchService.clearState();
    }
  }

  handleResetCounter(): void {
    this.stop$.next(true);
    this.isCounting = false;
    this.offset = this.time.getTime();
    this.time = new Date(0);
    this.recordList = [];
    this.offset = 0;
    this.timeDifference = 0;
    this.stopwatchService.clearState();
  }

  handleAddRecord(): void {
    if (this.isCounting) {
      this.recordList = [...this.recordList, this.time];
      this.stopwatchService.saveState(this.time, this.recordList);
    }
  }

  handleDeleteRecord(record: Date): void {
    const index: number = this.recordList.findIndex((item) => item === record);
    this.recordList.splice(index, 1);
    this.stopwatchService.saveState(this.time, this.recordList);
  }

  private calculateState(state: Stopwatch): void {
    const { time, recordList, date } = state;
    this.recordList = recordList;
    this.timeDifference = Date.now() - date.getTime() + time.getTime();
    this.time = new Date(this.timeDifference);

    if (this.timeDifference >= 1000) {
      this.countIntervals = Math.floor((this.timeDifference % 1000) / 10);
    } else {
      this.countIntervals = Math.floor(this.timeDifference / 10);
    }
  }

  private calculateTime(): void {
    this.time = new Date(
      performance.now() - this.since + this.offset + this.timeDifference
    );

    if (++this.countIntervals === 100) {
      this.blink = !this.blink;
      this.countIntervals = 0;
    } else if (this.countIntervals === 20) {
      this.blink = false;
    }
  }

  // @HostListener('window:beforeunload')
  // save() {
  //   this.stopwatchService.saveState(this.time, this.list);
  // }
}
