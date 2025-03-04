import {
  DatePipe,
  NgClass,
  NgStyle,
  NgTemplateOutlet,
  TitleCasePipe,
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickStopPropagationDirective } from 'src/app/directives/click-stop-propagation.directive';
import { ClassNamesDirective } from 'src/app/directives/cn.directive';

const imports = [
  NgClass,
  NgTemplateOutlet,
  NgStyle,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
];
const directives = [ClassNamesDirective, ClickStopPropagationDirective];
const pipes = [DatePipe, TitleCasePipe];

@NgModule({
  declarations: [...directives],
  imports: [...imports, ...pipes],
  exports: [...imports, ...directives, ...pipes],
  providers: [...pipes],
})
export class SharedModule {}
