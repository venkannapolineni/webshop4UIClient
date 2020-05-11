import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api-service.service';
import { Book } from '../shared/Book';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  isbn: number;
  book: Book;
  books: Book[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private restApi: RestApiService
  ) { }

  ngOnInit() {
    this.book = new Book();
    this.isbn = this.route.snapshot.params.isbn;
    this.loadBooks();
  }

  // Get books list
  loadBooks() {
    // tslint:disable-next-line: deprecation
    return this.restApi.getBooks().subscribe((books: Array<Book>) => {
      this.books = books;
    });
  }

 getBookById(isbn: number) {
    this.restApi.getBookById(this.isbn)
    .subscribe(data => {
      console.log(data);
      this.book = data;
    }, (error: any) => console.log(error));

    this.router.navigate(['books/details/' + isbn]);
}

  // Update Book
  updateBook() {
    if (window.confirm('Are you sure, you want to update?')) {
      this.restApi.updateBook(this.isbn, this.book).subscribe(data => {
        this.router.navigate(['/books/update/' + this.isbn]);
      });
    }
  }

  // Delete book
  deleteBook(isbn: number) {
    if (window.confirm('Are you sure, you want to delete?')) {
      this.restApi.deleteBook(isbn).subscribe(data => {
        this.loadBooks();
      });
    }
  }
}
