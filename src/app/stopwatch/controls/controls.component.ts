import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-controls',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
})
export class ControlsComponent {
  @Input() isCounting: boolean;
  @Output() toggleCounterEvent = new EventEmitter<null>();
  @Output() addRecordEvent = new EventEmitter<null>();
  @Output() resetCounterEvent = new EventEmitter<null>();

  constructor() {}

  toggleCounter(): void {
    this.toggleCounterEvent.emit();
  }

  addRecord(): void {
    this.addRecordEvent.emit();
  }

  resetCounter(): void {
    this.resetCounterEvent.emit();
  }
}
