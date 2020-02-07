import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { AuthorsComponent } from './authors.component';
import { AuthorsService, Author } from '../authors-service.service';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { By } from '@angular/platform-browser';

import Pretender from 'pretender';
import { RouterTestingModule } from '@angular/router/testing';

let data = JSON.stringify(require('../../../e2e/fixture/authors.json'))
const server = new Pretender(function () {
    this.get('//jsonapiplayground.reyesoft.com/v2/authors', (request: any) => {
        return [200, { "Content-Type": "application/json" }, data]
    });
});
describe('AuthorsComponent', () => {
    let component: AuthorsComponent;
    let fixture: ComponentFixture<AuthorsComponent>;
    let authorService: AuthorsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthorsComponent,
            ],
            providers: [
                AuthorsService,
                Author
            ],
            imports: [
                RouterTestingModule ,
                NgxJsonapiModule.forRoot({
                    url: '//jsonapiplayground.reyesoft.com/v2/'
                })
            ]
        }).compileComponents();
    });


    beforeEach(() => {
        fixture = TestBed.createComponent(AuthorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        authorService = TestBed.get(AuthorsService);
        spyOn(authorService, 'all').and.callThrough();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('should have a title', () => {
        const titleElements = fixture.debugElement.queryAll(By.css('h1'));

        expect(titleElements.length).toBe(1);
        expect(titleElements[0].nativeElement.innerHTML).toBe('Authors');
    });

    it('show all the authors', async () => {
        fixture.detectChanges();

        await new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1500);
        })
        fixture.detectChanges();

        const authorElements = fixture.debugElement.queryAll(By.css('.author'));
        expect(authorElements.length).toEqual(JSON.parse(data).data.length);
    });

});