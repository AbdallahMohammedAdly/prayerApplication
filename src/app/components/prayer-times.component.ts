import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrayerService, PrayerTimes, Location } from '../services/prayer.service';
import { LocationSelectorComponent } from './location-selector.component';

@Component({
  selector: 'app-prayer-times',
  standalone: true,
  imports: [CommonModule, LocationSelectorComponent],
  template: `
    <div class="container">
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
  `
})
export class PrayerTimesComponent implements OnInit {
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

  ngOnInit() {
    // Wait for user selection instead of loading immediately
  }

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