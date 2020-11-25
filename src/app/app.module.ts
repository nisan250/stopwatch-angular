import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShellComponent } from './stopwatch/shell/shell.component';
import { CounterComponent } from './stopwatch/counter/counter.component';
import { ControlsComponent } from './stopwatch/controls/controls.component';
import { RecordsComponent } from './stopwatch/records/records.component';

@NgModule({
  declarations: [AppComponent, ShellComponent, CounterComponent, ControlsComponent, RecordsComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
