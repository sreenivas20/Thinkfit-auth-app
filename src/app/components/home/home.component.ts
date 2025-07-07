import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="home-card">
        <h1>Welcome to Your Dashboard!</h1>
        <p>You have successfully signed in.</p>
        
        <div class="user-info">
          <h3>User Information</h3>
          <p><strong>Status:</strong> Logged In</p>
          <p><strong>Session:</strong> Active</p>
        </div>
        
        <button (click)="logout()" class="logout-btn">Logout</button>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    
    .home-card {
      background: white;
      padding: 40px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
      text-align: center;
    }
    
    h1 {
      color: #333;
      margin-bottom: 20px;
      font-size: 2.5em;
    }
    
    p {
      color: #666;
      font-size: 1.2em;
      margin-bottom: 30px;
    }
    
    .user-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 5px;
      margin-bottom: 30px;
      text-align: left;
    }
    
    .user-info h3 {
      color: #333;
      margin-bottom: 15px;
    }
    
    .user-info p {
      margin: 10px 0;
      font-size: 1em;
    }
    
    .logout-btn {
      padding: 12px 30px;
      background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      transition: opacity 0.3s;
    }
    
    .logout-btn:hover {
      opacity: 0.9;
    }
  `]
})
export class Home {
  constructor(private router: Router) {}
  
  logout() {
    // In a real app, you'd call your authentication service to logout
    console.log('User logged out');
    alert('You have been logged out!');
    this.router.navigate(['/signin']);
  }
}