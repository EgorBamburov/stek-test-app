import {FormGroup} from "@angular/forms";

export function enableOrDisableFormHelper(form: FormGroup, isEnable: boolean) {
  isEnable ? form.enable() : form.disable()
}
