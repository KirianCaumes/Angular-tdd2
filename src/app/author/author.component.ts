import { Component, OnInit } from '@angular/core';
import { Author, AuthorsService } from '../authors-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
    public author: Author;

    public constructor(private authorsService: AuthorsService, private route: ActivatedRoute) {
    }


    ngOnInit() {
        this.route.params.subscribe(({ id }) => {
            console.log(id)
            this.authorsService.get(id, { include: ['books'] })
                .subscribe(
                    (author: Author) => { 
                        this.author = author; 
                        console.log(author)
                    },
                    error => console.error('Could not load author.', error)
                );
        });
    }

}
