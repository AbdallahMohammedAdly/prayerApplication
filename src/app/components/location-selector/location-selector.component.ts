import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '../../services/prayer.service';

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
  `,
  styles: [`
    .location-form {
      background: rgba(255, 255, 255, 0.1);
      padding: 20px;
      border-radius: 15px;
      margin-bottom: 20px;
      backdrop-filter: blur(10px);
    }
    .form-group {
      margin-bottom: 15px;
      text-align: center;
    }
    .form-group label {
      display: block;
      color: white;
      margin-bottom: 8px;
      font-weight: bold;
    }
    .select-input {
      width: 100%;
      max-width: 300px;
      padding: 10px;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      color: #1a237e;
      font-family: 'Noto Naskh Arabic', Arial, sans-serif;
      font-size: 1em;
      transition: all 0.3s ease;
    }
    .select-input:disabled {
      background: rgba(255, 255, 255, 0.5);
      cursor: not-allowed;
    }
  `]
})
export class LocationSelectorComponent {
  @Output() locationChange = new EventEmitter<Location>();

  selectedCountry = '';
  selectedCity = '';

  countries = ['السعودية', 'مصر', 'الإمارات', 'الكويت', 'قطر', 'البحرين', 'عمان', 'الولايات المتحدة', 'الصين', 'فرنسا', 'ألمانيا', 'إيطاليا', 'الهند', 'اليابان', 'كندا', 'أستراليا'];
  
  cities: { [key: string]: string[] } = {
    'السعودية': ['مكة المكرمة', 'المدينة المنورة', 'الرياض', 'جدة', 'الدمام', 'تبوك', 'أبها', 'الطائف', 'بريدة', 'جازان'],
    'مصر': ['القاهرة', 'الإسكندرية', 'الجيزة', 'شرم الشيخ', 'الأقصر', 'أسوان', 'بورسعيد', 'المنصورة', 'طنطا', 'سوهاج'],
    'الإمارات': ['دبي', 'أبو ظبي', 'الشارقة', 'العين', 'الفجيرة', 'عجمان', 'رأس الخيمة', 'أم القيوين'],
    'الكويت': ['الكويت', 'الجهراء', 'حولي', 'الفروانية', 'الأحمدي', 'مبارك الكبير'],
    'قطر': ['الدوحة', 'الوكرة', 'الخور', 'مسيعيد', 'دخان', 'الشحانية'],
    'البحرين': ['المنامة', 'المحرق', 'الرفاع', 'سترة', 'جد حفص', 'عيسى'],
    'عمان': ['مسقط', 'صلالة', 'صحار', 'نزوى', 'السيب', 'صور'],
    'الولايات المتحدة': ['نيويورك', 'لوس أنجلوس', 'شيكاغو', 'هيوستن', 'سان فرانسيسكو', 'ميامي', 'بوسطن', 'لاس فيغاس', 'دالاس', 'أتلانتا'],
    'الصين': ['بكين', 'شنغهاي', 'شينزين', 'قوانغتشو', 'هونغ كونغ', 'تشينغداو', 'نانجينغ', 'ووهان', 'تيانجين', 'هانغتشو'],
    'فرنسا': ['باريس', 'مارسيليا', 'ليون', 'تولوز', 'نيس', 'نانت', 'ستراسبورغ', 'ليل', 'بوردو', 'رين'],
    'ألمانيا': ['برلين', 'ميونخ', 'فرانكفورت', 'هامبورغ', 'كولونيا', 'شتوتغارت', 'دوسلدورف', 'دورتموند', 'إيسن', 'لايبزيغ'],
    'إيطاليا': ['روما', 'ميلانو', 'نابولي', 'تورينو', 'فلورنسا', 'بولونيا', 'باليرمو', 'جنوة', 'باري', 'كاتانيا'],
    'الهند': ['نيودلهي', 'مومباي', 'بنغالور', 'تشيناي', 'حيدر آباد', 'أحمد آباد', 'بيون', 'كولكاتا', 'سورت', 'جايبور'],
    'اليابان': ['طوكيو', 'أوساكا', 'كيوتو', 'ناغويا', 'فوكوكا', 'هيروشيما', 'يوكوهاما', 'سابورو', 'كوبي', 'كانازاوا'],
    'كندا': ['تورونتو', 'فانكوفر', 'مونتريال', 'كالغاري', 'إدمونتون', 'أوتاوا', 'وينيبيغ', 'كيبك', 'هاليفاكس', 'ساسكاتون'],
    'أستراليا': ['سيدني', 'ملبورن', 'بريسبان', 'بيرث', 'أديلايد', 'هوبارت', 'داروين', 'كانبيرا', 'جولد كوست', 'نيوكاسل']
  };


  countryMapping: { [key: string]: string } = {
    'السعودية': 'Saudi Arabia',
    'مصر': 'Egypt',
    'الإمارات': 'UAE',
    'الكويت': 'Kuwait',
    'قطر': 'Qatar',
    'البحرين': 'Bahrain',
    'عمان': 'Oman',
    'الولايات المتحدة': 'United States',
    'الصين': 'China',
    'فرنسا': 'France',
    'ألمانيا': 'Germany',
    'إيطاليا': 'Italy',
    'الهند': 'India',
    'اليابان': 'Japan',
    'كندا': 'Canada',
    'أستراليا': 'Australia'
  };


  onCountryChange() {
    this.selectedCity = '';
  }

  onLocationChange() {
    if (this.selectedCountry && this.selectedCity) {
      this.locationChange.emit({
        city: this.selectedCity,
        country: this.countryMapping[this.selectedCountry]
      });
    }
  }
}