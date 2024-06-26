import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6),Validators.required,]),
  });
  handleSubmit() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe({
      next: (data) => {
        console.log(data);
        alert('Đăng kí thành công');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }
}