import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  public signStatus = true;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.createLoginFormGroup();
  }

  private createLoginFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  public signIn(): void {
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    this.authService.login(email, password);
    this.dialog.closeAll();
  }

  public changeForm(): void {
    this.signStatus = !this.signStatus;
  }

  public loginUserViaGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
