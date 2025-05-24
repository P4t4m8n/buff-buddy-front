import { inject, Injectable, signal } from '@angular/core';
import { IUserSetEditDTO } from '../../set/models/iSet';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private httpClient = inject(HttpClient);
  private baseUrl = environment.apiUrl + '/workout';
  private errors = signal<string | null>(null);

  constructor() {}

  saveUserSets(userSets: IUserSetEditDTO[]) {
    return this.httpClient.post(`${this.baseUrl}/user-sets`, userSets, {
      observe: 'response',
      responseType: 'text',
    });
  }
}
