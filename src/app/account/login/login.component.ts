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

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.http.get<any[]>(`http://localhost:3000/accounts?email=${email}`).subscribe(
        (users: any[]) => {
          if (Array.isArray(users) && users.length > 0) {
            const user = users[0];
            if (user.password === password) {
              console.log('Login successful:', user);
              
              // Store the logged-in user data in localStorage
              localStorage.setItem('loggedInUser', JSON.stringify(user));

              // Navigate based on the role
              if (user.role === 'user') {
                this.router.navigate(['/user']);
              } else if (user.role === 'admin') {
                this.router.navigate(['/admin']);
              }
            } else {
              alert('Invalid password!');
            }
          } else {
            alert('You are a new user, please register!');
            this.router.navigate(['/register']);
          }
        },
        error => {
          console.error('Error during login:', error);
          alert('An error occurred while trying to login. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields!');
    }
  }

  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
