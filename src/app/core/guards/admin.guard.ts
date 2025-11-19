import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectIsAdmin, selectIsAuthenticated } from '../../store/auth/auth.selectors';
import { combineLatest } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);

  return combineLatest([
    store.select(selectIsAuthenticated),
    store.select(selectIsAdmin),
  ]).pipe(
    take(1),
    map(([isAuthenticated, isAdmin]) => {
      if (!isAuthenticated) {
        router.navigate(['/auth/login']);
        return false;
      }

      if (!isAdmin) {
        router.navigate(['/dashboard']);
        return false;
      }

      return true;
    })
  );
};
