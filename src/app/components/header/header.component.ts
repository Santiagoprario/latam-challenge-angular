import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService,  public router: Router, private _snackBar: MatSnackBar) {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login')
    this._snackBar.open('Cierre de sesión exitoso', 'X', { duration : 2000 });
  }

}
