import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorComponent } from './author.component';
import { AuthorsService, Author } from '../authors-service.service';
import { Book } from '../books.service';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthorComponent', () => {
    let component: AuthorComponent;
    let fixture: ComponentFixture<AuthorComponent>;
    let authorService: AuthorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthorComponent,
            ],
            providers: [
                AuthorsService,
                Author,
                Book
            ],
            imports: [
                NgxJsonapiModule.forRoot({
                    url: '//jsonapiplayground.reyesoft.com/v2/'
                }),
                RouterTestingModule
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
