import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UserInterface } from '../../shared/interfaces/user.interface';
import { SocialTypeEnum } from '../../shared/enums/social-media.enum';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  public loginForm: FormGroup;
  public signStatus = true;
  public userAuthStatus: boolean;
  public user: UserInterface;
  public socialType = SocialTypeEnum;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.getUserFromLocal();
    this.loginForm = this.createLoginFormGroup();
    this.checkUserPresence();
  }

  private getUserFromLocal(): UserInterface {
    return this.authService.getUserFromLocalStorage();
  }

  private createLoginFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
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

  public register(): void {
    const name: string = this.loginForm.value.name;
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    this.authService.signUp(name, email, password);
    this.dialog.closeAll();
  }

  public signOut(): void {
    this.authService.singOut();
    this.dialog.closeAll();
  }

  public changeForm(): void {
    this.signStatus = !this.signStatus;
  }

  public loginVia(social: SocialTypeEnum): void {
    this.authService.loginWith(social);
    this.dialog.closeAll();
  }

  private checkUserPresence(): void {
    this.userAuthStatus = !!this.user;
  }
}
