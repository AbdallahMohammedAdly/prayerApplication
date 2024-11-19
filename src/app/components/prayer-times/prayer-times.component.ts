import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrayerService, PrayerTimes, Location } from '../../services/prayer.service';
import { LocationSelectorComponent } from '../location-selector/location-selector.component';

@Component({
  selector: 'app-prayer-times',
  standalone: true,
  imports: [CommonModule, LocationSelectorComponent],
  template: `
    <div class="prayer-times-container">
      <app-location-selector (locationChange)="onLocationChange($event)"></app-location-selector>

      <div *ngIf="loading" class="loading">
        جاري تحميل مواقيت الصلاة
      </div>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <div class="prayer-card" *ngIf="prayerTimes && !loading">
        <div class="prayer-time" *ngFor="let prayer of prayers">
          <span class="prayer-name">{{ prayer.nameAr }}</span>
          <span class="time">{{ formatTime(getPrayerTime(prayer.nameEn)) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prayer-times-container {
      padding: 2rem;
    }
    .prayer-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      padding: 2rem;
      margin-top: 2rem;
    }
    .prayer-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .prayer-time:hover {
      background: rgba(33, 150, 243, 0.1);
      transform: translateX(-5px);
      border-radius: 10px;
    }
    .prayer-time:last-child {
      border-bottom: none;
    }
    .prayer-name {
      font-weight: bold;
      color: #1a237e;
      font-size: 1.2em;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .time {
      color: #0d47a1;
      font-size: 1.2em;
      font-weight: bold;
      background: rgba(33, 150, 243, 0.1);
      padding: 8px 15px;
      border-radius: 20px;
      transition: all 0.3s ease;
    }
    .time:hover {
      background: rgba(33, 150, 243, 0.2);
      transform: scale(1.05);
    }
    .loading {
      text-align: center;
      color: #ffffff;
      font-size: 1.2em;
      margin: 2rem 0;
    }
    .error-message {
      color: #ffffff;
      background: rgba(244, 67, 54, 0.9);
      padding: 1rem;
      border-radius: 10px;
      margin: 1rem 0;
      text-align: center;
    }
  `]
})
export class PrayerTimesComponent {
  prayerTimes: PrayerTimes | null = null;
  loading = false;
  error: string | null = null;

  prayers = [
    { nameEn: 'Fajr', nameAr: 'الفجر' },
    { nameEn: 'Sunrise', nameAr: 'الشروق' },
    { nameEn: 'Dhuhr', nameAr: 'الظهر' },
    { nameEn: 'Asr', nameAr: 'العصر' },
    { nameEn: 'Maghrib', nameAr: 'المغرب' },
    { nameEn: 'Isha', nameAr: 'العشاء' }
  ];

  constructor(private prayerService: PrayerService) {}

  onLocationChange(location: Location) {
    this.loading = true;
    this.error = null;
    this.prayerService.getPrayerTimes(location).subscribe({
      next: (times) => {
        this.prayerTimes = times;
        this.loading = false;
        this.error = null;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        this.prayerTimes = null;
      }
    });
  }

  getPrayerTime(prayer: string): string {
    return this.prayerTimes ? this.prayerTimes[prayer as keyof PrayerTimes] : '';
  }

  formatTime(time: string): string {
    return time.replace(' (AST)', '');
  }
}