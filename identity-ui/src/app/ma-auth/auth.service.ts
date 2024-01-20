import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL, LoginDto, RegisterDto, UserDto } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private readonly http: HttpClient
  ) {}

  register(registerDto: RegisterDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.baseUrl}/api/Account/register`,
      registerDto
    );
  }

  login(loginDto: LoginDto): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.baseUrl}/api/Account/login`,
      loginDto
    );
  }
}
