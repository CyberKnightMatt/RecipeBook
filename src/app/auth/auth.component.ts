import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

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

  constructor(private authService: AuthService) { }

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
    
    this.isLoading = true;
    if(this.isLoginMode) {

    } else {
      this.authService.signup(email, password).subscribe({
        next: data => { 
          console.log(data)
          this.isLoading = false;
        },
        error: errorMessage => { 
          this.error = errorMessage;
          this.isLoading = false;
        }
      });
    }
    
    this.form.reset();
  }

}
