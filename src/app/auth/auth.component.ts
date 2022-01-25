import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  form: FormGroup;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email':    new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if(!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;
    
    let authObs: Observable<AuthResponseData>;
    
    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe({
      next: data => { 
        console.log(data)
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => { 
        this.error = errorMessage;
        this.isLoading = false;
      }
    })
    
    this.form.reset();
  }

  
}
