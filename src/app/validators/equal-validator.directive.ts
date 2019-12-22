import {Directive, Input} from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

@Directive({
  selector: '[appEqualValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EqualValidatorDirective, multi: true}]
})
export class EqualValidatorDirective {
  @Input('appEqualValidator') value: number;

  validate(c: FormControl): { [key: string]: any } | null {
    const v = c.value;
    return v !== null && (v === this.value) ? {equal: true} : null;
  }
}
