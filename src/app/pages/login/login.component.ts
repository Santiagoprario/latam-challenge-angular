import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ButtonComponent } from '../../components/button/button.component';
import { LoginService } from './login.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, MatSnackBarModule,  MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private loginService: LoginService, public router: Router, private _snackBar: MatSnackBar) {}

  matcher = new MyErrorStateMatcher();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  login(): void {
    if (!this.form.value.email || !this.form.value.password) return;
    this.loginService.login(this.form.value.email, this.form.value.password).subscribe(success => {
      if (success) {
        this._snackBar.open('Bienvenido!', 'X', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top'});
        this.router.navigateByUrl("/home");
      } else {
        this._snackBar.open("Usuario o contaseña incorrecta", "X") 
       //  { duration: 3000, panelClass: 'snackBar'});

      }
    });
  }

}
