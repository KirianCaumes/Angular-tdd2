import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

import { AuthorsComponent } from './authors.component';
import { AuthorsService, Author } from '../authors-service.service';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { By } from '@angular/platform-browser';

import Pretender from 'pretender';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthorComponent } from '../author/author.component';

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
    let location: Location
    let router: Router

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AuthorsComponent,
                AuthorComponent
            ],
            providers: [
                AuthorsService,
                Author
            ],
            imports: [
                RouterTestingModule.withRoutes(
                    [
                        { path: '', component: AuthorsComponent },
                        { path: 'author/:id', component: AuthorComponent },
                    ]
                ),
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

        location = TestBed.get(Location)
        router = TestBed.get(Router)
        router.initialNavigation();
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

    // it('should have a test button', async () => {
    //     fixture.detectChanges();
    //     await new Promise((resolve, reject) => {
    //         setTimeout(() => resolve(), 1500);
    //     })

    //     fixture.detectChanges();

    //     const button = fixture.debugElement.query(By.css('button'));
    //     expect(!!button).toBe(true);


    //     button.nativeElement.click();
    //     fixture.detectChanges();

    //     button.nativeElement.click();

    //     // spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    //     // expect(component.router.navigate).toHaveBeenCalledWith('/author/:id');

    //     // await fixture.whenStable().then(async () => {
    //     fixture.detectChanges();
    //     await new Promise((resolve, reject) => {
    //         setTimeout(() => resolve(), 1500);
    //     })
    //     fixture.detectChanges();
    //     expect(component.router.navigate).toHaveBeenCalledWith('/dqsdqsd/:id');
    //     // });


    // });

    it('navigate to "search" takes you to /search', async () => {

        fixture.detectChanges();
        await new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1500);
        })

        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(By.css('button'));
        const button = buttons[Math.floor(Math.random() * buttons.length)]
        
        expect(!!button).toBe(true);

        button.nativeElement.click();
        await new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 1500);
        })
        fixture.detectChanges();

        expect(location.path()).toBe(`/author/${button.attributes['data-test-id']}`);
    });

});