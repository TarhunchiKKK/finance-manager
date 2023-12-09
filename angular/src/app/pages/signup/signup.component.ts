import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, NgIf],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    userData: FormGroup;

    constructor() {
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
            console.log(this.userData.value);
        } else {
            console.log('Invalid');
        }
    }
}
