import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <img [src]="currentUser?.profilePicture || 'assets/default-avatar.png'" 
               [alt]="(currentUser?.firstName || '') + ' ' + (currentUser?.lastName || '')"
               onerror="this.src='https://placehold.co/100x100/667eea/white?text=User'">
        </div>
        <div class="profile-info">
          <h1>{{ currentUser?.firstName }} {{ currentUser?.lastName }}</h1>
          <p class="email">{{ currentUser?.email }}</p>
        </div>
        <button class="edit-btn" (click)="toggleEdit()">
          {{ isEditing ? 'Cancel' : 'Edit Profile' }}
        </button>
      </div>

      <div class="profile-content">
        <!-- VIEW MODE -->
        <div class="profile-section" *ngIf="!isEditing">
          <h2>Personal Information</h2>
          <div class="info-grid">
            <div class="info-item">
              <label>Full Name</label>
              <p>{{ currentUser?.firstName }} {{ currentUser?.lastName }}</p>
            </div>
            <div class="info-item">
              <label>Email</label>
              <p>{{ currentUser?.email }}</p>
            </div>
            <div class="info-item" *ngIf="currentUser?.phone">
              <label>Phone</label>
              <p>{{ currentUser?.phone }}</p>
            </div>
            <div class="info-item" *ngIf="currentUser?.dateOfBirth">
              <label>Date of Birth</label>
              <p>{{ formatDate(currentUser?.dateOfBirth) }}</p>
            </div>
            <div class="info-item full-width" *ngIf="currentUser?.address">
              <label>Address</label>
              <p>{{ currentUser?.address }}</p>
            </div>
            <div class="info-item full-width" *ngIf="currentUser?.bio">
              <label>Bio</label>
              <p>{{ currentUser?.bio }}</p>
            </div>
          </div>
        </div>

        <!-- EDIT MODE -->
        <div class="profile-section" *ngIf="isEditing">
          <h2>Edit Profile</h2>
          <form [formGroup]="editForm" (ngSubmit)="onSaveProfile()">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  formControlName="firstName"
                  class="form-control"
                >
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  formControlName="lastName"
                  class="form-control"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                formControlName="phone"
                class="form-control"
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
              ></textarea>
            </div>

            <div class="form-group">
              <label for="bio">Bio</label>
              <textarea 
                id="bio" 
                formControlName="bio"
                class="form-control"
                rows="4"
              ></textarea>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="cancelEdit()">
                Cancel
              </button>
              <button 
                type="submit" 
                class="btn-primary"
                [disabled]="editForm.invalid || isLoading"
              >
                {{ isLoading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      font-family: 'Inter', sans-serif;
      background-color: #f9fafb;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 2rem;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .profile-avatar img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 4px solid #667eea;
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .email {
      color: #666;
      margin: 0;
    }

    .edit-btn {
      padding: 0.75rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }

    .edit-btn:hover {
      background: #5a67d8;
    }

    .profile-content {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .profile-section h2 {
      color: #333;
      margin-top: 0;
      margin-bottom: 1.5rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #f0f0f0;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .info-item.full-width {
      grid-column: 1 / -1;
    }

    .info-item label {
      display: block;
      font-weight: 600;
      color: #555;
      margin-bottom: 0.5rem;
    }

    .info-item p {
      color: #333;
      margin: 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
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
      font-weight: 500;
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

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  editForm: FormGroup;
  isEditing = false;
  isLoading = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // Email is often not editable, but keeping it as per original logic
      email: ['', [Validators.required, Validators.email]], 
      dateOfBirth: [''],
      phone: [''],
      address: [''],
      bio: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Attempt to get the user immediately from the service
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      this.populateForm();
    }

    // Subscribe to any future changes to the user object
    this.userService.currentUser$.subscribe((user: User | null) => {
      this.currentUser = user;
      if (user) {
        this.populateForm();
      }
    });
  }

  populateForm(): void {
    if (this.currentUser) {
      this.editForm.patchValue({
        firstName: this.currentUser.firstName || '',
        lastName: this.currentUser.lastName || '',
        email: this.currentUser.email || '',
        dateOfBirth: this.currentUser.dateOfBirth || '',
        phone: this.currentUser.phone || '',
        address: this.currentUser.address || '',
        bio: this.currentUser.bio || ''
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.populateForm(); // Ensure form has the latest data when switching to edit mode
    }
  }

  onSaveProfile(): void {
    if (!this.editForm.valid) {
        // Mark all fields as touched to show validation errors
        this.editForm.markAllAsTouched();
        return;
    }

    this.isLoading = true;
    const updatedUserData: Partial<User> = this.editForm.value;

    this.userService.updateUserProfile(updatedUserData).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.isEditing = false;
        this.isLoading = false;
        console.log('Profile updated successfully');
        // Optionally, show a success toast/message to the user
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error updating profile:', err);
        // Optionally, show an error message to the user
      }
    });
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  formatDate(date: string | Date | null | undefined): string {
    if (!date) return 'Not provided';
    try {
      // Handles both 'YYYY-MM-DD' strings and Date objects
      const dateObj = new Date(date);
      // Adjust for timezone offset to prevent date from changing
      const userTimezoneOffset = dateObj.getTimezoneOffset() * 60000;
      return new Date(dateObj.getTime() + userTimezoneOffset).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return String(date); // Fallback to the original string
    }
  }
}
