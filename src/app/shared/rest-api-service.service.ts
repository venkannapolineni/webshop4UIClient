import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from './Book';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  // Define API
  apiURL = 'http://localhost:8080/api';
  book: Book;

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
    })
  };

  // HttpClient API get() method => Fetch books list
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.apiURL + '/books/all')
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API get() method => Fetch book
  getBookById(isbn: number): Observable<Book> {
    return this.http.get<Book>(this.apiURL + '/books/' + isbn)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

   // HttpClient API post() method => Create book
  createBook(book: Book): Observable<Book> {

    const isbn = book.isbn;
    const name = book.name;
    const libraryid = book.libraryid;
    const libraryname = book.libraryname;

    // tslint:disable-next-line: max-line-length
    const jsonBodyForBook = `{\"isbn\":${isbn}, \"name\":\"${name}\", \"library\": { \"libraryId\":${libraryid}, \"libraryName\":\"${libraryname}\"}}`;
    console.log(jsonBodyForBook);
    alert(jsonBodyForBook);
    return this.http.post<Book>(this.apiURL + '/books/post', jsonBodyForBook, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  // HttpClient API put() method => Update book
  updateBook(isbn, book): Observable<Book> {
    const name = book.name;
    const libraryid = book.libraryid;
    const libraryname = book.libraryname;
    // tslint:disable-next-line: max-line-length
    const jsonBodyForBook = `{\"isbn\":${isbn}, \"name\":${name}, \"library\": { \"libraryId\":${libraryid}, \"libraryName\":${libraryname}}}`;
    // console.log(jsonBodyForBook);
   // tslint:disable-next-line: max-line-length
    return this.http.put<Book>(this.apiURL + '/books/' + isbn, jsonBodyForBook, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // HttpClient API delete() method => Delete book
  deleteBook(isbn) {
    return this.http.delete<Book>(this.apiURL + '/books/' + isbn, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  // Error handling
  handleError(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }
}
