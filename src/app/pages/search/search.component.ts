import { Component, NgModule } from '@angular/core';
import { SearchService } from './search.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonComponent, MatFormFieldModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {  
  constructor(private searchIdRequest: SearchService, private _snackBar: MatSnackBar, public router: Router ) {}

  public searchTerm = new FormControl('');

  form = new FormGroup({
    userId: new FormControl('', [Validators.required])
  })

  result : any;

  translationMap: { [key: string]: string } = {
    "name": "Nombre",
    "email": "Correo Electrónico",
    "phone": "Teléfono",
    "age": "Edad",
    "isAssociated": "Es Asociado",
    "id": "Número de cliente"
  };

  getObjectKeysAndValues(obj: any): { key: string, value: any }[] {
    return Object.keys(obj).map(key => ({ key, value: obj[key] }));
  }

  translateKey(key: string): string {
    return this.translationMap[key] || key;
  }

  isDisabled () {
    return !this.form.value.userId;
  }

  onGoBack () :void {
    this.router.navigateByUrl('/home')
  }

  onSubmit(): void {
    if (!this.form.value.userId) return;
    this.searchIdRequest.searchId(this.form.value.userId).subscribe(data => {
      if (data) {
        this.result = data;
      } else {
        this._snackBar.open("Id no encontrado", "X", 
        { duration: 2000, panelClass: 'snackBar'});

      }
    });
  }
}
