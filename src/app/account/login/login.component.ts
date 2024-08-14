import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router: Router, private http: HttpClient){}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http.get<any[]>(`http://localhost:3000/accounts?email=${this.loginForm.value.email}`).subscribe(
        (users: any[]) => {
          if (Array.isArray(users)) { // Ensure the response is an array
            if (users.length > 0) {
              // User found, check password
              const user = users[0];
              if (user.password === this.loginForm.value.password) {
                console.log('Login successful:', user);
                if (user.role === 'user'){
                  this.router.navigate(['/user']);
                }else {
                  this.router.navigate(['/admin']);
                }
              } else {
                alert('Invalid password!'); 
              }
            } else {
              alert('You are a new user, please register!');
              this.router.navigate(['/register'])
            }
          } else {
            alert('Unexpected response format.');
          }
        },
        error => {
          console.error('Error during login:', error);
          alert('An error occurred while trying to login. Please try again.');
        }
      );
    } else {
      alert('Form is invalid!');
    }
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
