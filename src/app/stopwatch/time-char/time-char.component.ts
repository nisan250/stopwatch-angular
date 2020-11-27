import { Component, Input, OnChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-time-char',
  templateUrl: './time-char.component.html',
  styleUrls: ['./time-char.component.scss'],
})
export class TimeCharComponent implements OnChanges {
  @Input() small: boolean;
  @Input() date: number;

  minutes: string[];
  seconds: string[];
  msec: string[];

  constructor(private datePipe: DatePipe) {}

  ngOnChanges(): void {
    this.minutes = this.datePipe.transform(this.date, 'mm').split('');
    this.seconds = this.datePipe.transform(this.date, 'ss').split('');
    this.msec = this.datePipe.transform(this.date, 'SS').split('');
  }
}
