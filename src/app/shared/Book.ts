import { Library } from './library';

export class Book {
   isbn: number;
   name: string;
   libraryid: number;
   libraryname: string;
   library?: Library;
}
