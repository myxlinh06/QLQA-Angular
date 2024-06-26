import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required,]),
  });
  handleSubmit() {
    console.log(this.loginForm);
    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log(data);
        localStorage.setItem('token', (data as {accessToken: string}).accessToken)
        alert('Đăng nhập thành công');
        this.router.navigate(['/product/list']);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}