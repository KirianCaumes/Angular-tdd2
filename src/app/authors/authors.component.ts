import { Component, OnInit } from '@angular/core';
import { DocumentCollection } from 'ngx-jsonapi';
import { AuthorsService, Author } from './../authors-service.service';
import { Router } from '@angular/router';

@Component({
    selector: 'demo-authors',
    templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit {
    public authors: DocumentCollection<Author>;

    public constructor(private authorsService: AuthorsService, public router:Router) {
    }

    ngOnInit() {
        this.authorsService
            .all({
                // include: ['books']
            })
            .subscribe((authors: DocumentCollection<Author>) => {
                this.authors = authors
                console.log(authors)
            });

    }

    /**
     * getData
     */
    // public getData() {
    //     this.authorsService
    //         .all({
    //             // include: ['books', 'photos'],
    //         })
    //         .subscribe(authors => (this.authors = authors));
    // }
}