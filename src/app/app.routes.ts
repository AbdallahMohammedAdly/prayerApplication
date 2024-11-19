import { Routes } from '@angular/router';
import { PrayerTimesComponent } from './components/prayer-times/prayer-times.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CityPrayersComponent } from './components/city-prayers/city-prayers.component';

export const routes: Routes = [
  { path: '', redirectTo: 'prayer-times', pathMatch: 'full' },
  { path: 'prayer-times', component: PrayerTimesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'city-prayers', component: CityPrayersComponent }
];