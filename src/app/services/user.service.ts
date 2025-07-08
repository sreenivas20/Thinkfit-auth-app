import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';  

export interface User {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Load user from localStorage on service initialization
    this.loadUserFromStorage();
  }

  // Simulate signup process
  signup(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        try {
          const newUser: User = {
            id: Date.now().toString(),
            email: email,
            firstName: '',
            lastName: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          this.currentUserSubject.next(newUser);
          this.saveUserToStorage(newUser);
          observer.next(true);
          observer.complete();
        } catch (error) {
          observer.error('Signup failed');
        }
      }, 1000);
    });
  }

  // Simulate login process
  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        // In a real app, this would validate credentials against a backend
        const mockUser: User = {
          id: Date.now().toString(),
          email: email,
          firstName: 'John',
          lastName: 'Doe',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        this.currentUserSubject.next(mockUser);
        this.saveUserToStorage(mockUser);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  // Update user profile details with better error handling
  updateUserProfile(userDetails: Partial<User>): Observable<User> {
    return new Observable(observer => {
      setTimeout(() => {
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
          try {
            const updatedUser: User = { 
              ...currentUser, 
              ...userDetails,
              updatedAt: new Date().toISOString()
            };
            
            // Validate required fields
            if (!updatedUser.firstName || !updatedUser.lastName) {
              observer.error('First name and last name are required');
              return;
            }

            // Validate email format
            if (!this.isValidEmail(updatedUser.email)) {
              observer.error('Please enter a valid email address');
              return;
            }

            this.currentUserSubject.next(updatedUser);
            this.saveUserToStorage(updatedUser);
            observer.next(updatedUser);
            observer.complete();
          } catch (error) {
            observer.error('Failed to update profile');
          }
        } else {
          observer.error('No user logged in');
        }
      }, 1000); // Simulate API delay
    });
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  // Check if user has completed profile
  hasCompleteProfile(): boolean {
    const user = this.currentUserSubject.value;
    return user ? !!(user.firstName && user.lastName) : false;
  }

  // Get user's full name
  getFullName(): string {
    const user = this.currentUserSubject.value;
    if (!user) return '';
    return `${user.firstName || ''} ${user.lastName || ''}`.trim();
  }

  // Get user's initials
  getInitials(): string {
    const user = this.currentUserSubject.value;
    if (!user) return '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  }

  // Update profile picture
  updateProfilePicture(profilePicture: string): Observable<User> {
    return this.updateUserProfile({ profilePicture });
  }

  // Delete user account
  deleteAccount(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        try {
          this.currentUserSubject.next(null);
          localStorage.removeItem('currentUser');
          observer.next(true);
          observer.complete();
        } catch (error) {
          observer.error('Failed to delete account');
        }
      }, 1000);
    });
  }

  // Logout user
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  // Private helper methods
  private loadUserFromStorage(): void {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      localStorage.removeItem('currentUser');
    }
  }

  private saveUserToStorage(user: User): void {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Method to validate phone number (optional)
  private isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone);
  }

  // Method to format date consistently
  private formatDate(date: string | Date): string {
    if (!date) return '';
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString();
  }
}   

// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
// import { delay } from 'rxjs/operators';

// // Defines the structure for an Organization object
// export interface Organization {
//   id?: string;
//   ownerEmail: string; // Email of the person who created the organization
//   organizationName: string;
//   industry: string;
//   organizationPhone?: string;
//   foundedDate?: string;
//   organizationAddress?: string;
//   organizationDescription?: string;
//   logoUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class OrganizationService {
//   // BehaviorSubject to hold the current organization state
//   private currentOrganizationSubject = new BehaviorSubject<Organization | null>(null);
//   public currentOrganization$ = this.currentOrganizationSubject.asObservable();

//   constructor() {
//     // Load organization data from localStorage on service initialization
//     this.loadOrganizationFromStorage();
//   }

//   /**
//    * Simulates creating a new organization.
//    * In a real app, this would make an API call to a backend server.
//    * @param ownerEmail The email of the user creating the organization.
//    * @param organizationName The name of the new organization.
//    * @returns An observable that emits the new organization on success.
//    */
//   createOrganization(ownerEmail: string, organizationName: string): Observable<Organization> {
//     return new Observable(observer => {
//       // Simulate API call delay
//       setTimeout(() => {
//         try {
//           const newOrganization: Organization = {
//             id: `org_${Date.now()}`,
//             ownerEmail: ownerEmail,
//             organizationName: organizationName,
//             industry: '', // Initially empty, to be filled in the details form
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString()
//           };
//           this.currentOrganizationSubject.next(newOrganization);
//           this.saveOrganizationToStorage(newOrganization);
//           observer.next(newOrganization);
//           observer.complete();
//         } catch (error) {
//           observer.error('Organization creation failed');
//         }
//       }, 1000);
//     });
//   }

//   /**
//    * Updates the profile of the current organization.
//    * @param orgDetails The partial organization data to update.
//    * @returns An observable that emits the updated organization.
//    */
//   updateOrganizationProfile(orgDetails: Partial<Organization>): Observable<Organization> {
//     return new Observable(observer => {
//       setTimeout(() => {
//         const currentOrg = this.currentOrganizationSubject.value;
//         if (currentOrg) {
//           try {
//             const updatedOrg: Organization = {
//               ...currentOrg,
//               ...orgDetails,
//               updatedAt: new Date().toISOString()
//             };

//             // Basic validation
//             if (!updatedOrg.organizationName || !updatedOrg.industry) {
//               observer.error('Organization name and industry are required');
//               return;
//             }

//             this.currentOrganizationSubject.next(updatedOrg);
//             this.saveOrganizationToStorage(updatedOrg);
//             observer.next(updatedOrg);
//             observer.complete();
//           } catch (error) {
//             observer.error('Failed to update organization profile');
//           }
//         } else {
//           observer.error('No organization is currently loaded');
//         }
//       }, 1000); // Simulate API delay
//     });
//   }

//   /**
//    * Retrieves the current organization from the BehaviorSubject.
//    * @returns The current Organization object or null.
//    */
//   getCurrentOrganization(): Organization | null {
//     return this.currentOrganizationSubject.value;
//   }

//   /**
//    * Clears the current organization data from the service and localStorage.
//    */
//   clearOrganization(): void {
//     this.currentOrganizationSubject.next(null);
//     localStorage.removeItem('currentOrganization');
//   }

//   // --- Private Helper Methods ---

//   /**
//    * Loads the organization data from localStorage into the BehaviorSubject.
//    */
//   private loadOrganizationFromStorage(): void {
//     try {
//       const savedOrg = localStorage.getItem('currentOrganization');
//       if (savedOrg) {
//         const organization: Organization = JSON.parse(savedOrg);
//         this.currentOrganizationSubject.next(organization);
//       }
//     } catch (error) {
//       console.error('Error loading organization from storage:', error);
//       // Clear potentially corrupted data
//       localStorage.removeItem('currentOrganization');
//     }
//   }

//   /**
//    * Saves the current organization data to localStorage.
//    * @param organization The organization object to save.
//    */
//   private saveOrganizationToStorage(organization: Organization): void {
//     try {
//       localStorage.setItem('currentOrganization', JSON.stringify(organization));
//     } catch (error) {
//       console.error('Error saving organization to storage:', error);
//     }
//   }
// }
