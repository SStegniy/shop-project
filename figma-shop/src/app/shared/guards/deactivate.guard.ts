import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmService } from '../services/confirm.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../components/confirmation/confirmation.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DeactivateGuard implements CanDeactivate<unknown> {
  constructor(
    private confirmService: ConfirmService,
    private dialog: MatDialog) { }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.deactivateIfFilled();
  }

  private deactivateIfFilled(): Observable<boolean> | boolean {
    if (this.confirmService.personFormIsFilled) {
      const dialogRef = this.dialog.open(ConfirmationComponent, {});
      dialogRef.componentInstance.message = 'Are your really want to leave this page?';
      return dialogRef.afterClosed().pipe(map((res: boolean) => res === true));
    } else {
      return true;
    }
  }
}
