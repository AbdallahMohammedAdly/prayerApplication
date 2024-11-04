import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '../services/prayer.service';

@Component({
  selector: 'app-location-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="location-form">
      <div class="form-group">
        <label for="country">الدولة</label>
        <select 
          id="country" 
          [(ngModel)]="selectedCountry" 
          (change)="onCountryChange()"
          class="select-input">
          <option value="">اختر الدولة</option>
          <option *ngFor="let country of countries" [value]="country">
            {{ country }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="city">المدينة</label>
        <select 
          id="city" 
          [(ngModel)]="selectedCity" 
          (change)="onLocationChange()"
          class="select-input"
          [disabled]="!selectedCountry">
          <option value="">اختر المدينة</option>
          <option *ngFor="let city of cities[selectedCountry] || []" [value]="city">
            {{ city }}
          </option>
        </select>
      </div>
    </div>
  `
})
export class LocationSelectorComponent {
  @Output() locationChange = new EventEmitter<Location>();

  selectedCountry = '';
  selectedCity = '';

  countries = ['السعودية', 'مصر', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان'];
  
  cities: { [key: string]: string[] } = {
    'السعودية': ['مكة المكرمة', 'المدينة المنورة', 'الرياض', 'جدة', 'الدمام'],
    'مصر': ['القاهرة', 'الإسكندرية', 'الجيزة', 'شرم الشيخ'],
    'الإمارات': ['دبي', 'أبو ظبي', 'الشارقة', 'العين'],
    'الكويت': ['الكويت', 'الجهراء', 'حولي'],
    'قطر': ['الدوحة', 'الوكرة', 'الخور'],
    'البحرين': ['المنامة', 'المحرق', 'الرفاع'],
    'عمان': ['مسقط', 'صلالة', 'صحار']
  };

  countryMapping: { [key: string]: string } = {
    'السعودية': 'Saudi Arabia',
    'مصر': 'Egypt',
    'الإمارات': 'UAE',
    'الكويت': 'Kuwait',
    'قطر': 'Qatar',
    'البحرين': 'Bahrain',
    'عمان': 'Oman'
  };

  onCountryChange() {
    this.selectedCity = '';
    if (this.selectedCountry && this.selectedCity) {
      this.emitLocation();
    }
  }

  onLocationChange() {
    if (this.selectedCountry && this.selectedCity) {
      this.emitLocation();
    }
  }

  private emitLocation() {
    this.locationChange.emit({
      city: this.selectedCity,
      country: this.countryMapping[this.selectedCountry]
    });
  }
}