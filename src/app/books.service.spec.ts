import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';
import { AuthorsService } from './authors-service.service';
import { NgxJsonapiModule } from 'ngx-jsonapi';

describe('BookService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxJsonapiModule.forRoot({
                    url: '//jsonapiplayground.reyesoft.com/v2/'
                }),
            ],
            providers: [
                AuthorsService,
                BooksService
            ]
        }).compileComponents();
    });
    it('should be created', () => {
        const service: BooksService = TestBed.get(BooksService);
        expect(service).toBeTruthy();
    });
});
