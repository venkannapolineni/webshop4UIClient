import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api-service.service';
import { Book } from '../shared/Book';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  book: Book = new Book();
  submitted = false;

  constructor(private restApi: RestApiService,
              private router: Router) { }
  ngOnInit(): void {
  }
  newBook(): void {
    this.submitted = false;
    this.book = new Book();
  }

  addBook() {
    this.restApi.createBook(this.book)
      .subscribe(data => console.log(data), error => console.log(error));
    this.book = new Book();
    this.gotoList();
  }

  onSubmit() {
    this.submitted = true;
    this.addBook();
  }

  gotoList() {
    this.router.navigate(['/books/all']);
  }

  }
