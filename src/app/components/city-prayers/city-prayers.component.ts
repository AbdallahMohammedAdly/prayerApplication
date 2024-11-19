import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrayerService, PrayerTimes } from '../../services/prayer.service';

@Component({
  selector: 'app-city-prayers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="city-prayers">
      <h2>الصلاة حسب المدينة</h2>
      
      <div class="search-form">
        <div class="form-group">
          <label for="city">اختر المدينة</label>
          <select 
            id="city" 
            [(ngModel)]="selectedCity" 
            (change)="onCityChange()"
            class="select-input">
            <option value="">اختر المدينة</option>
            <option *ngFor="let city of cities" [value]="city.value">
              {{ city.label }}
            </option>
          </select>
        </div>
      </div>

      <div *ngIf="loading" class="loading">
        جاري تحميل مواقيت الصلاة
      </div>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <div class="prayer-card" *ngIf="prayerTimes && !loading">
        <div class="prayer-time" *ngFor="let prayer of prayers">
          <span class="prayer-name">{{ prayer.nameAr }}</span>
          <span class="time">{{ getPrayerTime(prayer.nameEn) }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .city-prayers {
      padding: 2rem;
    }
    h2 {
      color: #ffffff;
      text-align: center;
      margin-bottom: 2rem;
    }
    .search-form {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 15px;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);
    }
    .form-group {
      text-align: center;
    }
    .select-input {
      width: 100%;
      max-width: 300px;
      padding: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      color: #1a237e;
      font-family: 'Noto Naskh Arabic', Arial, sans-serif;
      font-size: 1em;
    }
    .prayer-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    .prayer-time {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .prayer-name {
      font-weight: bold;
      color: #1a237e;
      font-size: 1.2em;
    }
    .time {
      color: #0d47a1;
      font-weight: bold;
      background: rgba(33, 150, 243, 0.1);
      padding: 0.5rem 1rem;
      border-radius: 20px;
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
export class CityPrayersComponent {
  selectedCity: string = '';
  prayerTimes: PrayerTimes | null = null;
  loading = false;
  error: string | null = null;

  cities = [
    { label: 'مكة المكرمة', value: 'Makkah' },
    { label: 'المدينة المنورة', value: 'Medina' },
    { label: 'الرياض', value: 'Riyadh' },
    { label: 'جدة', value: 'Jeddah' },
    { label: 'الدمام', value: 'Dammam' },
    { label: 'تبوك', value: 'Tabuk' },
    { label: 'أبها', value: 'Abha' },
    { label: 'الطائف', value: 'Taif' },
    { label: 'بريدة', value: 'Buraydah' },
    { label: 'جازان', value: 'Jazan' },
    { label: 'القاهرة', value: 'Cairo' },
    { label: 'الإسكندرية', value: 'Alexandria' },
    { label: 'الجيزة', value: 'Giza' },
    { label: 'شرم الشيخ', value: 'Sharm El Sheikh' },
    { label: 'الأقصر', value: 'Luxor' },
    { label: 'أسوان', value: 'Aswan' },
    { label: 'بورسعيد', value: 'Port Said' },
    { label: 'المنصورة', value: 'Mansoura' },
    { label: 'دبي', value: 'Dubai' },
    { label: 'أبو ظبي', value: 'Abu Dhabi' },
    { label: 'الشارقة', value: 'Sharjah' },
    { label: 'العين', value: 'Al Ain' },
    { label: 'الفجيرة', value: 'Fujairah' },
    { label: 'الكويت', value: 'Kuwait' },
    { label: 'الجهراء', value: 'Jahra' },
    { label: 'حولي', value: 'Hawalli' },
    { label: 'الفروانية', value: 'Farwaniya' },
    { label: 'الأحمدي', value: 'Ahmadi' },
    { label: 'الدوحة', value: 'Doha' },
    { label: 'الوكرة', value: 'Al Wakrah' },
    { label: 'الخور', value: 'Al Khor' },
    { label: 'مسيعيد', value: 'Mesaieed' },
    { label: 'مسقط', value: 'Muscat' },
    { label: 'صلالة', value: 'Salalah' },
    { label: 'صحار', value: 'Sohar' },
    { label: 'نزوى', value: 'Nizwa' },
    { label: 'باريس', value: 'Paris' },
    { label: 'مارسيليا', value: 'Marseille' },
    { label: 'ليون', value: 'Lyon' },
    { label: 'تولوز', value: 'Toulouse' },
    { label: 'برلين', value: 'Berlin' },
    { label: 'ميونخ', value: 'Munich' },
    { label: 'فرانكفورت', value: 'Frankfurt' },
    { label: 'هامبورغ', value: 'Hamburg' },
    { label: 'روما', value: 'Rome' },
    { label: 'ميلانو', value: 'Milan' },
    { label: 'نابولي', value: 'Naples' },
    { label: 'فلورنسا', value: 'Florence' },
    { label: 'لندن', value: 'London' },
    { label: 'مانشستر', value: 'Manchester' },
    { label: 'ليفربول', value: 'Liverpool' },
    { label: 'نيويورك', value: 'New York' },
    { label: 'لوس أنجلوس', value: 'Los Angeles' },
    { label: 'شيكاغو', value: 'Chicago' },
    { label: 'سان فرانسيسكو', value: 'San Francisco' },
    { label: 'واشنطن', value: 'Washington' },
    { label: 'بكين', value: 'Beijing' },
    { label: 'شنغهاي', value: 'Shanghai' },
    { label: 'هونغ كونغ', value: 'Hong Kong' },
    { label: 'كيوتو', value: 'Kyoto' },
    { label: 'طوكيو', value: 'Tokyo' },
  ];

  prayers = [
    { nameEn: 'Fajr', nameAr: 'الفجر' },
    { nameEn: 'Sunrise', nameAr: 'الشروق' },
    { nameEn: 'Dhuhr', nameAr: 'الظهر' },
    { nameEn: 'Asr', nameAr: 'العصر' },
    { nameEn: 'Maghrib', nameAr: 'المغرب' },
    { nameEn: 'Isha', nameAr: 'العشاء' }
  ];

  constructor(private prayerService: PrayerService) {}

  onCityChange() {
    if (this.selectedCity) {
      this.loading = true;
      this.error = null;
      this.prayerService.getPrayerTimes({ city: this.selectedCity, country: 'Saudi Arabia' }).subscribe({
        next: (times) => {
          this.prayerTimes = times;
          this.loading = false;
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          this.prayerTimes = null;
        }
      });
    }
  }

  getPrayerTime(prayer: string): string {
    return this.prayerTimes ? this.prayerTimes[prayer] || '' : '';
  }
}