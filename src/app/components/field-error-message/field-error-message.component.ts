import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/modules/shared.module';

@Component({
  selector: 'app-field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule],
})
export class FieldErrorMessageComponent implements OnInit, OnDestroy {
  constructor(private readonly changeDetectorRef: ChangeDetectorRef) {}
  @Input({ required: true }) control!: FormControl;
  @Input() styleClass = '';
  @Input() customErrorMessages: Record<string, string> = {};

  controlEventSubscription!: Subscription;

  get errorMessages(): Record<string, string> {
    return {
      required: `This field is required.`,
      email: `enter a valid email.`,
      min: `enter a value of <MIN_VALUE> or greater.`,
      max: `enter a value of <MAX_VALUE> or less.`,
      minlength: `enter at least <REQUIRED_LENGTH> characters.`,
      maxlength: `enter no more than <REQUIRED_LENGTH> characters.`,
      pattern: `enter a valid value.`,
      ...this.customErrorMessages,
    };
  }

  get errorMessage() {
    if (!this.control.errors) {
      return '';
    }

    const requiredError = this.control.errors['required'];
    if (requiredError) {
      return this.errorMessages['required'];
    }

    const emailError = this.control.errors['email'];
    if (emailError) {
      return this.errorMessages['email'];
    }

    const minError = this.control.errors['min'];
    if (minError) {
      return this.errorMessages['min'].replace('<MIN_VALUE>', minError.min);
    }

    const maxError = this.control.errors['max'];
    if (maxError) {
      return this.errorMessages['max'].replace('<MAX_VALUE>', maxError.max);
    }

    const minlengthError = this.control.errors['minlength'];
    if (minlengthError) {
      return this.errorMessages['minlength'].replace(
        '<REQUIRED_LENGTH>',
        minlengthError.requiredLength
      );
    }

    const maxlengthError = this.control.errors['maxlength'];
    if (maxlengthError) {
      return this.errorMessages['maxlength'].replace(
        '<REQUIRED_LENGTH>',
        maxlengthError.requiredLength
      );
    }

    const patternError = this.control.errors['pattern'];
    if (patternError) {
      return this.errorMessages['pattern'];
    }

    const keys = Object.keys(this.control.errors);

    for (let index = 0; index < keys.length; index += 1) {
      const key = keys[index];
      const unknownError = this.control.errors[key];
      const unknownErrorMessage = this.errorMessages[key];
      if (unknownError && unknownErrorMessage) {
        return unknownErrorMessage;
      }
    }

    return '';
  }

  ngOnInit(): void {
    this.controlEventSubscription = this.control.events.subscribe(() => {
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.controlEventSubscription) {
      this.controlEventSubscription.unsubscribe();
    }
  }
}
