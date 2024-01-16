import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { UserRole } from '../../shared/components/sidenav/userRole';
import { SnackbarService } from './../../shared/components/snackbar/snackbar.service';
import { TokenService } from './token.service';

interface EmailAvailable {
  usernameAlreadyExists: boolean;
}

interface CreateUser {
  firstName: string;
  lastName: string;
  email: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface RefreshToken {
  access_token: string;
}

interface UserDecoded {
  userId: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  onBoardPages: string[];
  iat: string;
}

export interface Credentials {
  email: string; //TODO: change on back-end to email
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  signIn$ = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private snackbarService: SnackbarService
  ) {}

  private setSession(authResult: UserDecoded) {
    localStorage.setItem('user', JSON.stringify(authResult));
  }

  public emailAvailable(email: string) {
    return this.http.post<EmailAvailable>(`${environment.apiUrl}/users/email`, {
      email,
    });
  }

  public signup(user: CreateUser) {
    return this.http.post<CreateUser>(`${environment.apiUrl}/users`, {
      ...user,
    });
  }

  public forgotPassword(email: string) {
    return this.http.post<unknown>(`${environment.apiUrl}/users/forgot`, {
      email,
    });
  }

  resetPassword(password: string, resetPasswordToken: string) {
    return this.http.post<unknown>(`${environment.apiUrl}/users/reset`, {
      password,
      resetPasswordToken,
    });
  }

  validate(password: string, token: string) {
    return this.http.post<unknown>(`${environment.apiUrl}/users/validate`, {
      password,
      token,
    });
  }

  public signin(credentials: Credentials) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/auth/login`, {
        ...credentials,
      })
      .pipe(
        tap((creadential) => {
          const jwt = jwtDecode<UserDecoded>(creadential.access_token);
          this.tokenService.setToken(creadential.access_token);
          this.tokenService.setRefreshToken(creadential.refresh_token);
          this.setSession(jwt);
          this.signIn$.next(true);
        })
      );
  }

  public getUser(): UserDecoded | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  public logout() {
    this.tokenService.clearToken();
    localStorage.removeItem('user');
    this.signIn$.next(false);
    this.router.navigate(['/auth/signin']);
    this.snackbarService.showSnackbar(
      'Saiu',
      'Você foi deslogado com sucesso!',
      3000
    );
  }

  public isAdmin(): boolean {
    const user = this.getUser();
    if (!user) return false;
    return parseInt(user.role) === UserRole.ADMIN;
  }

  public isUser(): boolean {
    const user = this.getUser();
    if (!user) return false;
    return parseInt(user.role) === UserRole.USER;
  }
  /**
   *
   * @returns true when user logged
   */
  public isLoggedIn() {
    if (this.getUser()) {
      this.signIn$.next(true);
      return true;
    }
    return false;
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
