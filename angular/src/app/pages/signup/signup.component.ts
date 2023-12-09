import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    providers: [AuthService],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    userData: FormGroup;

    constructor(private readonly authService: AuthService) {
        this.userData = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    onSubmit() {
        if (this.userData.valid) {
            this.authService.signUp(this.userData.value)
        } else {
            console.log('Invalid');
        }
    }
}
