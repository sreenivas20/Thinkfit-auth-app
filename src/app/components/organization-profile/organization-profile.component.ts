import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OrganizationService, Organization } from '../../services/organization/organization.service';
import { CommonModule } from '@angular/common';
import { RoutePaths } from '../../Routes/Routes'; // Assuming you have this file for route constants

@Component({
  selector: 'app-organization-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <!-- Using a placeholder for the organization logo -->
          <img 
            [src]=" 'https://placehold.co/100x100/764ba2/white?text=Org'" 
            [alt]="currentOrganization?.organizationName"
          >
        </div>
        <div class="profile-info">
          <h1>{{ currentOrganization?.organizationName }}</h1>
          <p class="specialization">{{ currentOrganization?.specialization }}</p>
        </div>
        <button class="edit-btn" (click)="navigateToEdit()">
          Edit Profile
        </button>
      </div>

      <div class="profile-content">
        <div class="profile-section">
          <h2>Organization Details</h2>
          <div class="info-grid">
            <div class="info-item full-width" *ngIf="currentOrganization?.description">
              <label>Description</label>
              <p class="description-text">{{ currentOrganization?.description }}</p>
            </div>
            <div class="info-item" *ngIf="currentOrganization?.website">
              <label>Website</label>
              <p><a [href]="currentOrganization?.website" target="_blank">{{ currentOrganization?.website }}</a></p>
            </div>
            <div class="info-item full-width" *ngIf="currentOrganization?.address">
              <label>Address</label>
              <p>{{ currentOrganization?.address }}</p>
            </div>
          </div>
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
      border-radius: 12px; /* Square with rounded corners for orgs */
      object-fit: cover;
      border: 4px solid #764ba2;
    }

    .profile-info {
      flex: 1;
    }

    .profile-info h1 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .specialization {
      color: #666;
      margin: 0;
      font-style: italic;
    }

    .edit-btn {
      padding: 0.75rem 1.5rem;
      background: #764ba2;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      transition: background-color 0.3s;
    }

    .edit-btn:hover {
      background: #6a4491;
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
      word-break: break-word;
    }

    .info-item a {
      color: #667eea;
      text-decoration: none;
    }
    
    .info-item a:hover {
      text-decoration: underline;
    }

    .description-text {
      white-space: pre-wrap; /* Preserves formatting in the description */
    }

    @media (max-width: 768px) {
      .profile-header {
        flex-direction: column;
        text-align: center;
      }
    }
  `]
})
export class OrganizationProfileComponent implements OnInit {
  currentOrganization: Organization | null = null;
  public routePaths = RoutePaths;

  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadOrganizationProfile();
  }

  loadOrganizationProfile(): void {
    // Fetch the organization data from your service
    this.currentOrganization = this.organizationService.getCurrentOrganization();
    
    // In a real app, you might also subscribe to an observable
    // if the organization data can change dynamically.
  }

  navigateToEdit(): void {
    // Use the router to navigate to the edit page
    this.router.navigate([this.routePaths.ORGANIZATION_DETAILS]);
  }
}
