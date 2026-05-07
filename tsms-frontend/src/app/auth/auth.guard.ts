import { inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {

//   constructor(private authService: AuthService, private router: Router) {}


//   canActivate(route: ActivatedRouteSnapshot): boolean {
//     if (!this.authService.isLoggedIn()) {
//       this.router.navigate(['/login']);
//       return false;
//     }

//     const requiredRole = route.data['role'] as string;
//     if (requiredRole && this.authService.getRole() !== requiredRole) {
//       return false;
//     }

//     return true;
//   }
// }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isLoggedIn()) {
      return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }

    const requiredRole = route.data['role'] as string;
    const userRole = authService.getRole();

    if (requiredRole && userRole !== requiredRole){
      return router.createUrlTree(['/unauthorized']);
    }

    return true;
  };