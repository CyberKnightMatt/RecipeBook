import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  form: FormGroup;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email':    new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy(): void {
    this.closeSub?.unsubscribe();
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

  onHandleError() {
    this.error = null;
  }
}
