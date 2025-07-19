// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { catchError } from 'rxjs/operators';
// import { throwError } from 'rxjs';

// export const authInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
//   const router = inject(Router); // For redirection on errors (e.g., 401)

//   const token = localStorage.getItem('jwtToken');

//   const authReq = token
//     ? req.clone({
//         setHeaders: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//     : req;

//   return next(authReq).pipe(
//     catchError((error: HttpErrorResponse) => {
//       // Handle common error statuses
//       if (error.status === 401) {
//         console.warn('Unauthorized! Redirecting to login.');
//         router.navigate(['/login']);
//       } else if (error.status === 403) {
//         console.warn('Forbidden! Access denied.');
//       } else if (error.status >= 500) {
//         console.error('Server error:', error.message);
//       }

//       // Re-throw the error so subscriber can handle if needed
//       return throwError(() => error);
//     })
//   );
// };
