import { Injectable } from '@angular/core';
import { Autoregister, Service, Resource, DocumentCollection, DocumentResource, BooksService } from 'ngx-jsonapi';
import { Book } from './books.service';
// import { Photo } from '../photos/photos.service';

export class Author extends Resource {
    public attributes = {
        name: 'default name',
        date_of_birth: '',
        date_of_death: '',
        created_at: '',
        updated_at: ''
    };

    public relationships = {
        books: new DocumentCollection<Book>(),
        // photo: new DocumentResource<Photo>()
    };
}

// @Injectable()
@Injectable({
    providedIn: 'root',
})
export class AuthorsService extends Service<Author> {
    constructor() {
        super()
        new BooksService()
        this.register()
    }

    public resource = Author;
    public type = 'authors';
}