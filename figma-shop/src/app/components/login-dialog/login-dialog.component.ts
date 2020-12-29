import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  public signStatus = true;
  public userAuthStatus = false;
  public user: UserInterface;

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
    this.userAuthStatus = true;
  }

  public signOut(): void {
    this.authService.singOut();
    this.dialog.closeAll();
    this.userAuthStatus = false;
  }

  public changeForm(): void {
    this.signStatus = !this.signStatus;
  }

  public loginVia(social: string): void {
    this.userAuthStatus = true;
    this.dialog.closeAll();
    if (social === 'facebook') {
      this.authService.loginWith(social);
    } else {
      this.authService.loginWith(social);
    }
  }
}
