import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import moment from 'moment-hijri';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="calendar-container">
      <div class="calendar-card">
        <h2>التقويم</h2>
        <div class="date-info">
          <div class="date-block">
            <h3>التاريخ الهجري</h3>
            <p>{{ hijriDate }}</p>
          </div>
          <div class="date-block">
            <h3>التاريخ الميلادي</h3>
            <p>{{ gregorianDate }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calendar-container {
      padding: 2rem;
    }
    .calendar-card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
    h2 {
      color: #1a237e;
      margin-bottom: 2rem;
    }
    .date-info {
      display: flex;
      justify-content: space-around;
      gap: 2rem;
    }
    .date-block {
      flex: 1;
      padding: 1.5rem;
      background: rgba(33, 150, 243, 0.1);
      border-radius: 15px;
      transition: transform 0.3s ease;
    }
    .date-block:hover {
      transform: translateY(-5px);
    }
    h3 {
      color: #0d47a1;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.5rem;
      color: #1a237e;
      font-weight: bold;
    }
  `]
})
export class CalendarComponent implements OnInit {
  hijriDate: string = '';
  gregorianDate: string = '';

  ngOnInit() {
    const now = moment();
    this.hijriDate = now.format('iYYYY/iM/iD');
    this.gregorianDate = now.format('YYYY/M/D');
  }
}