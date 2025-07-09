import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoutePaths } from '../../Routes/Routes'; // Using your import path

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="layout-container">
      <!-- Sidebar -->
      <aside class="sidebar" [class.collapsed]="isCollapsed">
        <div class="sidebar-header">
          <h2 class="logo">{{ isCollapsed ? 'D' : 'Dashboard' }}</h2>
        </div>
        <nav class="nav-menu">
          <a [routerLink]="routePaths.HOME" routerLinkActive="active" class="nav-item">
            <i class="icon">🏠</i>
            <span *ngIf="!isCollapsed">Home</span>
          </a>
          <a [routerLink]="routePaths.PROFILE" routerLinkActive="active" class="nav-item">
            <i class="icon">👤</i>
            <span *ngIf="!isCollapsed">User Profile</span>
          </a>
          <a [routerLink]="routePaths.ORGANIZATION_PROFILE" routerLinkActive="active" class="nav-item">
            <i class="icon">🏢</i>
            <span *ngIf="!isCollapsed">Organization</span>
          </a>
        </nav>
        <div class="sidebar-footer">
           <button (click)="logout()" class="nav-item logout-btn">
             <i class="icon">🚪</i>
             <span *ngIf="!isCollapsed">Logout</span>
           </button>
           <button class="collapse-btn" (click)="toggleCollapse()">
             <i class="icon">{{ isCollapsed ? '→' : '←' }}</i>
           </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      width: 100vw;
    }

    .layout-container {
      display: flex;
      height: 100%;
      width: 100%;
      background-color: #f4f7f6;
    }

    .sidebar {
      width: 250px;
      background: #2c3e50;
      color: white;
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
    }

    .sidebar.collapsed {
      width: 80px;
    }

    .sidebar-header {
      padding: 1.5rem 1rem;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      border-bottom: 1px solid #34495e;
    }
    
    .logo {
        margin: 0;
        white-space: nowrap;
    }

    .nav-menu {
      flex-grow: 1;
      padding-top: 1rem;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      color: #bdc3c7;
      text-decoration: none;
      transition: background-color 0.3s, color 0.3s;
      white-space: nowrap;
      gap: 1rem;
    }

    .nav-item:hover, .nav-item.active {
      background-color: #34495e;
      color: white;
    }

    .nav-item .icon {
      font-size: 1.5rem;
      width: 24px;
      text-align: center;
    }
    
    .sidebar-footer {
        padding: 1rem;
        border-top: 1px solid #34495e;
    }
    
    .logout-btn, .collapse-btn {
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
    }
    
    .collapse-btn {
        margin-top: 0.5rem;
        text-align: center;
        background-color: #34495e;
        border-radius: 5px;
    }

    .collapse-btn .icon {
        display: inline-block;
        transition: transform 0.3s;
    }

    .main-content {
      flex-grow: 1;
      padding: 2rem;
      overflow-y: auto;
    }
  `]
})
export class LayoutComponent {
  public routePaths = RoutePaths;
  isCollapsed = false;

  constructor(private router: Router) {}

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    console.log('User logged out');
    this.router.navigate([RoutePaths.SIGNIN]);
  }
}
