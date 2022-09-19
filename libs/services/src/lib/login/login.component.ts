import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { LocalstorageService } from '../localstorage.service';



@Component({
  selector: 'ncf-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';
  
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router) { }

  ngOnInit(): void {
    this._initLoginForm();
  }

  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get loginForm(){
    return this.loginFormGroup.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    const loginData = {
      email: this.loginForm['email'].value,
      password: this.loginForm['password'].value
    }
    
    if(this.loginFormGroup.invalid) return;

    this.auth.login(loginData.email, loginData.password)
    .subscribe(user => {
      this.authError = false;
      this.localstorageService.setToken(user.token);
      this.router.navigate(['/']);
    }, (error : HttpErrorResponse)=> {
      console.log(error);
      this.authError = true;
      if(error.status !== 400){
        this.authMessage = 'Internal Server Error';      }
    })
  }
}
