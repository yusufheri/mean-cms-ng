import { Component, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blogpost';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogpost',
  templateUrl: './blogpost.component.html',
  styleUrls: ['./blogpost.component.css']
})
export class BlogpostComponent implements OnInit {
  blogPost$: Observable<BlogPost>;

  constructor(private activatedRoute: ActivatedRoute, private blogPostService: BlogpostService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.blogPost$ = this.blogPostService.getBlogPostById(id);
  }

}
