import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Define the structure of an Organization
export interface Organization {
  id: string;
  organizationName: string;
  specialization: string;
  address?: string;
  website?: string;
  description?: string;
}

// This decorator is crucial for dependency injection.
// 'providedIn: 'root'' makes the service a singleton available app-wide.
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  // A mock organization object for demonstration purposes.
  // In a real app, this would come from an API call or a state management store.
  private currentOrganization: Organization = {
    id: 'org-123',
    organizationName: 'Default Corp',
    specialization: 'Initial Services',
    address: '123 Main St, Anytown',
    website: 'https://default.com',
    description: 'A default organization for demonstration.'
  };

  constructor() { }

  /**
   * Retrieves the current organization's data.
   * @returns The current organization object.
   */
  getCurrentOrganization(): Organization | null {
    // In a real app, you might check if the user is part of an organization.
    return this.currentOrganization;
  }

  /**
   * Updates the organization's profile data.
   * @param profileData - An object containing the organization details to update.
   * @returns An Observable with the updated organization data.
   */
  updateOrganizationProfile(profileData: Partial<Organization>): Observable<Organization> {
    // In a real application, this method would make an HTTP PUT/PATCH request to your backend API.
    // Here, we simulate that by updating the local object and returning it as an Observable.
    
    console.log('Updating organization profile with:', profileData);
    
    this.currentOrganization = { ...this.currentOrganization, ...profileData };

    // We use 'of()' from RxJS to return the data as an Observable,
    // and 'delay()' to simulate network latency.
    return of(this.currentOrganization).pipe(
      delay(1000) // Simulate a 1-second save time
    );
  }
}
