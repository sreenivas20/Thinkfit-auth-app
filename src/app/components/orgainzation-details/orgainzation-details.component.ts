import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { OrganizationService, Organization } from '../../services/organization/organization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-details',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="organization-details-container">
      <div class="organization-details-card">
        <h2>Set Up Your Organization</h2>
        <p class="subtitle">Provide your organization's details to get started</p>
        
        <form [formGroup]="organizationDetailsForm" (ngSubmit)="onSaveDetails()">
          <div class="form-group">
            <label for="organizationName">Organization Name *</label>
            <input 
              type="text" 
              id="organizationName" 
              formControlName="organizationName"
              class="form-control"
              placeholder="e.g., Acme Corporation"
              [class.error]="organizationDetailsForm.get('organizationName')?.invalid && organizationDetailsForm.get('organizationName')?.touched"
            >
            <div class="error-message" *ngIf="organizationDetailsForm.get('organizationName')?.invalid && organizationDetailsForm.get('organizationName')?.touched">
              Organization name is required
            </div>
          </div>

          <div class="form-group">
            <label for="specialization">Specialization *</label>
            <input 
              type="text" 
              id="specialization" 
              formControlName="specialization"
              class="form-control"
              placeholder="e.g., Software Development, Marketing"
              [class.error]="organizationDetailsForm.get('specialization')?.invalid && organizationDetailsForm.get('specialization')?.touched"
            >
            <div class="error-message" *ngIf="organizationDetailsForm.get('specialization')?.invalid && organizationDetailsForm.get('specialization')?.touched">
              Specialization is required
            </div>
          </div>

          <div class="form-group">
            <label for="address">Address</label>
            <textarea 
              id="address" 
              formControlName="address"
              class="form-control"
              rows="3"
              placeholder="Enter the organization's address"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="website">Website</label>
            <input 
              type="url" 
              id="website" 
              formControlName="website"
              class="form-control"
              placeholder="https://www.example.com"
            >
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              formControlName="description"
              class="form-control"
              rows="4"
              placeholder="Tell us about your organization..."
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
              [disabled]="organizationDetailsForm.invalid || isLoading"
            >
              {{ isLoading ? 'Saving...' : 'Save Details' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .organization-details-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .organization-details-card {
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
      .form-actions {
        flex-direction: column;
      }
    }
  `]
})
export class OrganizationDetailsComponent implements OnInit {
  organizationDetailsForm: FormGroup;
  isLoading = false;
  currentOrganization: Organization | null = null;

  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService,
    private router: Router
  ) {
    this.organizationDetailsForm = this.fb.group({
      organizationName: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      address: [''],
      website: [''],
      description: ['']
    });
  }

  ngOnInit() {
    // Assuming you have a service method to get the current organization
    this.currentOrganization = this.organizationService.getCurrentOrganization();
    if (!this.currentOrganization) {
      // Redirect if no organization context, perhaps to a creation page
      this.router.navigate(['/create-organization']);
      return;
    }

    // Pre-fill form with existing data if available
    this.organizationDetailsForm.patchValue({
      organizationName: this.currentOrganization.organizationName || '',
      specialization: this.currentOrganization.specialization || '',
      address: this.currentOrganization.address || '',
      website: this.currentOrganization.website || '',
      description: this.currentOrganization.description || ''
    });
  }

  onSaveDetails() {
    if (this.organizationDetailsForm.valid) {
      this.isLoading = true;
      const formData = this.organizationDetailsForm.value;
      
      this.organizationService.updateOrganizationProfile(formData).subscribe({
        next: (organization: any) => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']); // Navigate to a relevant page
        },
        error: (error: any) => {
          this.isLoading = false;
          console.error('Failed to update organization profile:', error);
        }
      });
    }
  }

  onSkip() {
    this.router.navigate(['/dashboard']); // Navigate to a relevant page
  }
}