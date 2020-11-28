import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss'],
})
export class RecordsComponent implements OnChanges {
  @Input() recordList: Date[];
  @Output() deleteRecordEvent = new EventEmitter<Date>();
  @ViewChild('recordsEl', { read: ElementRef })
  public recordsEl: ElementRef<any>;
  isRecordAdded: boolean;

  constructor() {}

  deleteRecord(record: Date): void {
    this.deleteRecordEvent.emit(record);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { recordList } = changes;
    if (recordList && this.recordsEl) {
      this.isRecordAdded = true;
    } else {
      this.isRecordAdded = false;
    }
  }

  ngAfterViewChecked() {
    if (this.isRecordAdded) {
      this.recordsEl.nativeElement.scrollTop = this.recordsEl.nativeElement.scrollHeight;
      this.isRecordAdded = false;
    }
  }
}
