import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  isFullScreenPage = false;
  title = 'TSMS';
  navItems = [
    { path: '/customers', label: 'Customers', icon: 'people' },
    { path: '/employees', label: 'Employees', icon: 'badge' },
    { path: '/stock', label: 'Stock', icon: 'inventory_2' },
    { path: '/lookups', label: 'Lookups', icon: 'settings' },
    { path: '/users', label: 'Users', icon: 'admin_panel_settings', roles: ['ADMIN'] }
  ];

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isFullScreenPage = event.urlAfterRedirects === '/error';
    });
  }

  confirmLogout() {
    const snackBarRef = this.snackBar.open('Are you sure you want to logout?', 'Yes', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snackBarRef.onAction().subscribe(() => {
      this.authService.logout();
    });
  }
}
