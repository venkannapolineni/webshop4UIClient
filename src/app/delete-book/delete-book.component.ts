import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {
  books: any;

  constructor(private restApi: RestApiService,
              private router: Router) {}

  ngOnInit() {
  }

  deleteBook(id: number) {
    this.restApi.deleteBook(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  reloadData() {
    this.books = this.restApi.getBooks();
  }
}
