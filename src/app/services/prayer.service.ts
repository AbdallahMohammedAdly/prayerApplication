import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface PrayerTimes {
  [key: string]: string;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface Location {
  city: string;
  country: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrayerService {
  private readonly API_URL = 'https://api.aladhan.com/v1/timingsByCity';

  constructor(private http: HttpClient) {}

  getPrayerTimes(location: Location): Observable<PrayerTimes> {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    return this.http
      .get<any>(this.API_URL, {
        params: {
          city: location.city,
          country: location.country,
          method: '4',
          date: `${date}-${month}-${year}`
        }
      })
      .pipe(
        map(response => {
          if (!response.data?.timings) {
            throw new Error('لم يتم العثور على بيانات مواقيت الصلاة');
          }
          return response.data.timings;
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'حدث خطأ في جلب مواقيت الصلاة';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `خطأ في الاتصال: ${error.error.message}`;
    } else if (error.status === 0) {
      errorMessage = 'لا يمكن الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت الخاص بك';
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = `خطأ في الخادم: ${error.status} - ${error.statusText}`;
    }
    
    return throwError(() => errorMessage);
  }
}