import { PrayerService} from './services/prayer.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrayerTimesComponent } from "./components/prayer-times.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PrayerTimesComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[PrayerService]
})
export class AppComponent {
  title = 'PrayerApplication';
}
