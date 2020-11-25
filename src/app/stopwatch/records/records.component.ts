import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent {
  @Input() recordList: Date[];
  @Output() deleteRecordEvent = new EventEmitter<Date>();

  constructor() {}

  deleteRecord(record: Date): void {
    this.deleteRecordEvent.emit(record);
  }
}
