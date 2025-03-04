/* eslint-disable @angular-eslint/directive-selector */

import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import {
  ClassNameValue,
  extendTailwindMerge,
  fromTheme,
  twJoin,
} from 'tailwind-merge';

type AdditionalClassGroupIds = 'ion-bg';

export const twMerge = extendTailwindMerge<AdditionalClassGroupIds>({
  prefix: 'tw-',
  extend: {
    classGroups: {
      'ion-bg': [
        {
          'ion-bg': [fromTheme('colors')],
        },
      ],
    },
  },
});

function cn(...inputs: Array<ClassNameValue>) {
  return twMerge(twJoin(inputs));
}

@Directive({
  selector: '[cn]',
  standalone: false,
})
export class ClassNamesDirective implements OnChanges {
  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @Input() cn: Array<ClassNameValue> = [];

  ngOnChanges(): void {
    const previousClasses = this.elementRef.nativeElement.className;
    const classes = cn(previousClasses, this.cn);
    this.elementRef.nativeElement.className = classes;
  }
}
