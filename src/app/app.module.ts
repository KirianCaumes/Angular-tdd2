import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { NgxJsonapiModule } from 'ngx-jsonapi';
import { AuthorsService, Author } from './authors-service.service';
import { AuthorComponent } from './author/author.component';
import { BooksService } from './books.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxJsonapiModule.forRoot({
        url: '//jsonapiplayground.reyesoft.com/v2/'
    })
  ],
  providers: [
    AuthorsService,
    BooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
