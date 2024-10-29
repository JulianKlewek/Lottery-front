import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {RegistrationRequest} from "../model/RegistrationRequest";
import {LoginRequest} from "../model/LoginRequest";

const LOGIN_URL = 'auth/signin'
const REGISTER_URL = 'auth/signup'
const CONFIRM_EMAIL_URL = 'auth/confirm-account'

const translatedErrorMapKeys: { [index: string]: string } = {
  password: "Hasło",
  email: "Email",
  username: "Nazwa użytkownika"
};

const validationErrors: { [index: string]: string } = {
  INSUFFICIENT_UPPERCASE: "Brak wielkiej litery",
  INSUFFICIENT_DIGIT: "Brak liczby",
  INSUFFICIENT_SPECIAL: "Brak znaku specjalnego",
  ILLEGAL_WHITESPACE: "Niedozwolony znak biały",
  TOO_SHORT: "Zbyt krótkie",
  TOO_LONG: "Zbyt długie",
  MUST_BE_IN_RANGE_8_TO_50: "Email musi być adresem dłuższym niż 8 znakow i krótszym niż 50"
};

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  register(request: RegistrationRequest): Observable<any> {
    return this.http.post(REGISTER_URL, {...request}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  login(request: LoginRequest): Observable<any> {
    console.log(request)
    return this.http.post(LOGIN_URL, {...request}, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  confirmEmail(token: string): Observable<any> {
    return this.http.get(
      CONFIRM_EMAIL_URL, {params: {token: token}, headers: httpOptions.headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMsg = {};
    if (error.status === 401) {
      errorMsg = this.handle401Error(error);
    } else if (error.status === 400) {
      errorMsg = this.handle400Error(error);
    }  else if (error.status === 500) {
      errorMsg = this.handle500Error(error);
    } else {
      errorMsg = `Error: ${error.message}`;
    }
    return throwError(() => errorMsg);
  }

  private handle401Error(error: HttpErrorResponse): string {
    if (error.error.message === 'Bad credentials') {
      return 'Błędny login lub hasło.';
    } else if (error.error.message === 'User is disabled') {
      return 'Konto nieaktywne. Link do aktywacji konta został wysłany na podany wcześniej email';
    } else {
      return `Error: ${error.message}`;
    }
  }

  private handle500Error(error: HttpErrorResponse): string {
    if (error.error.message === 'Internal Server Error') {
      return 'Internal Server Error';
    } else {
      return `Error: ${error.message}`;
    }
  }

  private handle400Error(error: HttpErrorResponse) {
    if (error.error.message === 'VALIDATION FAILED') {
      const userFriendlyErrors: { [key: string]: string } = {};
      for (let key in error.error.errors) {
        const issues = error.error.errors[key].split(',').map((issue: string) => validationErrors[issue.trim()] || issue);
        const translatedKey = translatedErrorMapKeys[key] || key;
        userFriendlyErrors[translatedKey] = issues.join(', ');
      }
      return userFriendlyErrors;
    } else {
      return error.error.errors;
    }
  }

}
