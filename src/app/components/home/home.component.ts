import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <!-- Left Sidebar Menu -->
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul class="menu-list">
          <li class="menu-item">
            <button 
              class="menu-button" 
              [class.active]="activeMenu === 'home'"
              (click)="setActiveMenu('home')">
              <i class="icon">🏠</i>
              Home
            </button>
          </li>
          <li class="menu-item">
            <button 
              class="menu-button" 
              [class.active]="activeMenu === 'organization'"
              (click)="navigateToOrganization()">
              <i class="icon">🏢</i>
              Organization Profile
            </button>
          </li>
          <li class="menu-item">
            <button 
              class="menu-button" 
              [class.active]="activeMenu === 'users'"
              (click)="setActiveMenu('users')">
              <i class="icon">👥</i>
              Users
            </button>
          </li>
          <li class="menu-item">
            <button 
              class="menu-button" 
              [class.active]="activeMenu === 'settings'"
              (click)="setActiveMenu('settings')">
              <i class="icon">⚙️</i>
              Settings
            </button>
          </li>
          <li class="menu-item">
            <button 
              class="menu-button" 
              [class.active]="activeMenu === 'Logout'"
              (click)="logout()">
              <i class="icon">⚙️</i>
              Logout
            </button>
          </li>
        </ul>
      </nav>

      <!-- Main Content Area -->
      <main class="main-content">
        <div class="home-content-card" *ngIf="activeMenu === 'home'">
          <h1>Welcome to Your Dashboard!</h1>
          <p>You have successfully signed in. Use the menu on the left to navigate.</p>
          
          <div class="dashboard-stats">
            <div class="stat-card">
              <h3>Active Users</h3>
              <div class="stat-number">248</div>
              <p class="stat-description">Users currently active</p>
            </div>
            
            <div class="stat-card">
              <h3>Organization Status</h3>
              <div class="stat-number">Active</div>
              <p class="stat-description">All systems operational</p>
            </div>
            
            <div class="stat-card">
              <h3>Total Projects</h3>
              <div class="stat-number">12</div>
              <p class="stat-description">Active projects running</p>
            </div>
          </div>
          
          <div class="info-box">
            <h3>User Information</h3>
            <p><strong>Status:</strong> Logged In</p>
            <p><strong>Session:</strong> Active</p>
            <p><strong>Role:</strong> Administrator</p>
            <p><strong>Last Login:</strong> Today at 2:30 PM</p>
          </div>
        </div>

        <div class="content-card" *ngIf="activeMenu === 'users'">
          <h1>User Management</h1>
          <p>Manage users and permissions in your organization.</p>
          <div class="info-box">
            <h3>User Statistics</h3>
            <p><strong>Total Users:</strong> 248</p>
            <p><strong>Active Users:</strong> 201</p>
            <p><strong>Pending Invitations:</strong> 12</p>
          </div>
        </div>

        <div class="content-card" *ngIf="activeMenu === 'settings'">
          <h1>Settings</h1>
          <p>Configure your dashboard and application settings.</p>
          <div class="info-box">
            <h3>System Configuration</h3>
            <p><strong>Version:</strong> 2.1.0</p>
            <p><strong>Environment:</strong> Production</p>
            <p><strong>Last Updated:</strong> 2 hours ago</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: flex;
      min-height: 100vh;
      background: #f5f5f5;
    }

    /* Sidebar Styles */
    .sidebar {
      width: 280px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      position: fixed;
      height: 100vh;
      overflow-y: auto;
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.05);
    }

    .sidebar-header h2 {
      margin: 0;
      font-size: 1.5em;
      font-weight: 600;
    }

    .menu-list {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
    }

    .menu-item {
      margin: 0.5rem 0;
    }

    .menu-button {
      width: 100%;
      background: none;
      border: none;
      color: white;
      padding: 1rem 1.5rem;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 1rem;
      transition: all 0.3s ease;
      border-radius: 0;
    }

    .menu-button:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }

    .menu-button.active {
      background: rgba(255, 255, 255, 0.2);
      border-right: 4px solid white;
    }

    .icon {
      font-size: 1.2em;
      width: 24px;
      text-align: center;
    }

    /* Main Content Styles */
    .main-content {
      flex: 1;
      margin-left: 280px;
      padding: 2rem;
      background: #f8f9fa;
    }

    .home-content-card,
    .content-card {
      background: white;
      padding: 2rem 3rem;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
      text-align: center;
      max-width: 1200px;
    }

    h1 {
      color: #333;
      margin-bottom: 1rem;
      font-size: 2.2em;
    }

    p {
      color: #666;
      font-size: 1.1em;
      margin-bottom: 2rem;
    }

    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 16px rgba(118, 75, 162, 0.3);
    }

    .stat-card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.1em;
      opacity: 0.9;
    }

    .stat-number {
      font-size: 2.5em;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .stat-description {
      margin: 0;
      font-size: 0.9em;
      opacity: 0.8;
    }

    .info-box {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      text-align: left;
      display: inline-block;
      min-width: 300px;
    }

    .info-box h3 {
      color: #333;
      margin-top: 0;
      margin-bottom: 1rem;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 0.5rem;
    }

    .info-box p {
      margin: 0.5rem 0;
      font-size: 1em;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .sidebar {
        width: 100%;
        height: auto;
        position: relative;
      }

      .main-content {
        margin-left: 0;
        padding: 1rem;
      }

      .dashboard-container {
        flex-direction: column;
      }
      
      .dashboard-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class Home implements OnInit {
  activeMenu: string = 'home';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes to update active menu
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url.includes('organization-profile')) {
        this.activeMenu = 'organization';
      } else if (event.url.includes('home')) {
        this.activeMenu = 'home';
      }
    });
  }

    logout() {
    // In a real app, you'd call your authentication service to logout
    console.log('User logged out');
    alert('You have been logged out!');
    this.router.navigate(['/signin']);
    }

  setActiveMenu(menu: string): void {
    this.activeMenu = menu;
  }

  navigateToOrganization(): void {
    this.activeMenu = 'organization';
    this.router.navigate(['/organization-profile']);
  }
}