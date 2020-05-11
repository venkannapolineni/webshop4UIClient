import { BookDetailsComponent } from './book-details/book-details.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BookListComponent } from './book-list/book-list.component';
import { UpdateBookComponent } from './update-book/update-book.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';
import { BookNotFoundComponent } from './book-not-found/book-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'books/all', pathMatch: 'full' },
  { path: 'books/all', component: BookListComponent },
  { path: 'books/add', component: CreateBookComponent },
  { path: 'books/update/:id', component: UpdateBookComponent },
  { path: 'books/details/:id', component: BookDetailsComponent },
  { path: 'books/delete/:id', component: DeleteBookComponent },
  { path: '**', component: BookNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
