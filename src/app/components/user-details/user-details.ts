import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="user-details-container">
      <div class="user-details-card">
        <h2>Complete Your Profile</h2>
        <p class="subtitle">Please provide your details to continue</p>
        
        <form [formGroup]="userDetailsForm" (ngSubmit)="onSaveDetails()">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input 
                type="text" 
                id="firstName" 
                formControlName="firstName"
                class="form-control"
                [class.error]="userDetailsForm.get('firstName')?.invalid && userDetailsForm.get('firstName')?.touched"
              >
              <div class="error-message" *ngIf="userDetailsForm.get('firstName')?.invalid && userDetailsForm.get('firstName')?.touched">
                First name is required
              </div>
            </div>

            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input 
                type="text" 
                id="lastName" 
                formControlName="lastName"
                class="form-control"
                [class.error]="userDetailsForm.get('lastName')?.invalid && userDetailsForm.get('lastName')?.touched"
              >
              <div class="error-message" *ngIf="userDetailsForm.get('lastName')?.invalid && userDetailsForm.get('lastName')?.touched">
                Last name is required
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              formControlName="phone"
              class="form-control"
              placeholder="+1 (555) 123-4567"
            >
          </div>

          <div class="form-group">
            <label for="dateOfBirth">Date of Birth</label>
            <input 
              type="date" 
              id="dateOfBirth" 
              formControlName="dateOfBirth"
              class="form-control"
            >
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <textarea 
              id="address" 
              formControlName="address"
              class="form-control"
              rows="3"
              placeholder="Enter your address"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="bio">Bio</label>
            <textarea 
              id="bio" 
              formControlName="bio"
              class="form-control"
              rows="4"
              placeholder="Tell us about yourself..."
            ></textarea>
          </div>

          <div class="form-actions">
            <button 
              type="button" 
              class="btn-secondary"
              (click)="onSkip()"
            >
              Skip for Now
            </button>
            <button 
              type="submit" 
              class="btn-primary"
              [disabled]="userDetailsForm.invalid || isLoading"
            >
              {{ isLoading ? 'Saving...' : 'Save Details' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .user-details-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .user-details-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 600px;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      text-align: center;
      color: #666;
      margin-bottom: 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s;
      font-family: inherit;
    }

    .form-control:focus {
      outline: none;
      border-color: #667eea;
    }

    .form-control.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .btn-primary {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .btn-secondary {
      background: #f8f9fa;
      color: #666;
      border: 2px solid #ddd;
    }

    .btn-primary:hover:not(:disabled), .btn-secondary:hover {
      transform: translateY(-2px);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    @media (max-width: 640px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  isLoading = false;
  currentUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userDetailsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: [''],
      dateOfBirth: [''],
      address: [''],
      bio: ['']
    });
  }

  ngOnInit() {
    this.currentUser = this.userService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/signup']);
      return;
    }

    // Pre-fill form with existing data if available
    this.userDetailsForm.patchValue({
      firstName: this.currentUser.firstName || '',
      lastName: this.currentUser.lastName || '',
      phone: this.currentUser.phone || '',
      dateOfBirth: this.currentUser.dateOfBirth || '',
      address: this.currentUser.address || '',
      bio: this.currentUser.bio || ''
    });
  }

  onSaveDetails() {
    if (this.userDetailsForm.valid) {
      this.isLoading = true;
      const formData = this.userDetailsForm.value;
      
      this.userService.updateUserProfile(formData).subscribe({
        next: (user: any) => {
          this.isLoading = false;
          this.router.navigate(['/home']);
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Failed to update profile:', error);
        }
      });
    }
  }

  onSkip() {
    // Save minimal required data and proceed
    const minimalData = {
      firstName: this.userDetailsForm.get('firstName')?.value || 'User',
      lastName: this.userDetailsForm.get('lastName')?.value || ''
    };
    
    this.userService.updateUserProfile(minimalData).subscribe({
      next: (user: any) => {
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.error('Failed to update profile:', error);
      }
    });
  }
}