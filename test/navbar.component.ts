import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-links">
        <a routerLink="/prayer-times" routerLinkActive="active">مواقيت الصلاة</a>
        <a routerLink="/calendar" routerLinkActive="active">التقويم</a>
        <a routerLink="/city-prayers" routerLinkActive="active">الصلاة حسب المدينة</a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 1rem;
      margin-bottom: 2rem;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
    }
    a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }
    a:hover {
      background: rgba(255, 255, 255, 0.2);
    }
    .active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: bold;
    }
  `]
})