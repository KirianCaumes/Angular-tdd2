import { TestBed } from '@angular/core/testing';

import { AuthorsService } from './authors-service.service';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { BooksService } from './books.service';

describe('AuthorsServiceService', () => {
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
        const service: AuthorsService = TestBed.get(AuthorsService);
        expect(service).toBeTruthy();
    });
});
