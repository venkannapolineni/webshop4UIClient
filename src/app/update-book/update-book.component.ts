import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api-service.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
    id = this.actRoute.snapshot.params.isbn;
    employeeData: any = {};

    constructor(
      public restApi: RestApiService,
      public actRoute: ActivatedRoute,
      public router: Router
    ) {
    }

    ngOnInit() {
      this.restApi.getBookById(this.id).subscribe((data: {}) => {
        this.employeeData = data;
      });
    }

    // Update employee data
    updateEmployee() {
      if (window.confirm('Are you sure, you want to update?')) {
        this.restApi.updateBook(this.id, this.employeeData).subscribe(data => {
          this.router.navigate(['/employees-list']);
        });
      }
  }
}
