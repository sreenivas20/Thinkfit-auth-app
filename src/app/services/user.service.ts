import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Load user from localStorage on service initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Simulate signup process
  signup(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        const newUser: User = {
          id: Date.now().toString(),
          email: email,
          firstName: '',
          lastName: ''
        };
        this.currentUserSubject.next(newUser);
        this.saveUserToStorage(newUser);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  // Update user profile details
  updateUserProfile(userDetails: Partial<User>): Observable<User> {
    return new Observable(observer => {
      const currentUser = this.currentUserSubject.value;
      if (currentUser) {
        const updatedUser = { ...currentUser, ...userDetails };
        this.currentUserSubject.next(updatedUser);
        this.saveUserToStorage(updatedUser);
        observer.next(updatedUser);
        observer.complete();
      } else {
        observer.error('No user logged in');
      }
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

  // Logout user
  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  private saveUserToStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}