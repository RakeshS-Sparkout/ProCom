import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Observable } from 'rxjs';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.value;

    if (!password) {
      return null; 
    }

    // Check password conditions
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 8;

    // Check if all conditions are met
    const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;

    return !valid ? { passwordStrength: true } : null; // Return error object if invalid
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, passwordValidator()]),
      confirm: new FormControl('', Validators.required),
      role: new FormControl('user', Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.value.password === this.registerForm.value.confirm) {
      this.checkEmailExists(this.registerForm.value.email).subscribe(exists => {
        if (exists) {
          alert("Your email is already registered!");
        } else {
          this.http.post('http://localhost:3000/accounts', this.registerForm.value).subscribe ({
            next: (response) => {
              console.log('Account Registered:',response);
            },
            error: (err) => {
              console.log(err);
            }
          });
        }
      });
    } else {
      if (this.registerForm.invalid){
        alert("Form is invalid!");
      }else {
        alert('Password do not match!');
      }
      
    }
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`http://localhost:3000/accounts?email=${email}`).pipe(
      map(accounts => {
        console.log('Accounts found:', accounts); 
        return Array.isArray(accounts) && accounts.length > 0;
      }),
      catchError(() => {
        console.error('Error checking email existence'); 
        return [false]; 
      })
    );
  }

  navigateToLogin(){
    this.router.navigate(['/login']);
  }

}
