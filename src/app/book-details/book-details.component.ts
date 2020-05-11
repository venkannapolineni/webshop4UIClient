import { Book } from '../shared/Book';
import { Component, OnInit, Input } from '@angular/core';
import { RestApiService } from '../shared/rest-api-service.service';
import { BookListComponent } from '../book-list/book-list.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  isbn: number;
  book: Book;
  books: Book[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private restApi: RestApiService) { }
  ngOnInit() {

    this.book = new Book();

    this.isbn = this.route.snapshot.params.isbn;
    }

    getBookDetails() {
      this.restApi.getBookById(this.isbn)
      .subscribe(data => {
        console.log(data);
        this.book = data;
      }, (error: any) => console.log(error));
      this.router.navigate(['books/all']);
      }
    }
