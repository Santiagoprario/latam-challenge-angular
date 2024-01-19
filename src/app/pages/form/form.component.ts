import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, NgForm, FormGroupDirective, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormService, IAssociate } from './form.service';
import { MatRadioModule } from '@angular/material/radio';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatRadioModule, CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, MatSnackBarModule,  MatFormFieldModule, MatInputModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  constructor( private formService: FormService, public router: Router, private _snackBar: MatSnackBar) {}

  matcher = new MyErrorStateMatcher();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.min(18)]),
    isAssociated: new FormControl(false, [Validators.required]),
  })

  onGoBack () {
    this.router.navigateByUrl("/home");
  }

  onSubmit(): void {
    let formValues = this.form.value
    if (!formValues.name || !formValues.email || !formValues.age || !formValues.phone) return;

    this.formService.requestForm({...this.form.value}).subscribe(success => {
      if (success) {
        this._snackBar.open('Asociado creado con exito', 'X', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        this.router.navigateByUrl("/home");
      } else {
        this._snackBar.open("No se ha podido crear. Reintente", "X", 
        { duration: 3000, panelClass: 'snackBar'});
      }
    });
  }

}
