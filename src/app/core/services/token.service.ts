import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  getTokenExpiration(): number | null {
    const token = this.getToken();
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp) {
        return payload.exp;
      }
    } catch (error) {
      console.error('Error parsing token payload:', error);
    }

    return null;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token') || '';
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refresh_token', refreshToken);
  }

  clearToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  isTokenExpired(): boolean {
    const tokenExpiration = this.getTokenExpiration();
    const currentTime = Date.now() / 1000;
    return tokenExpiration && currentTime > tokenExpiration ? true : false;
  }
}
