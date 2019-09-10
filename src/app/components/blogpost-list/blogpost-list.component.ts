import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../models/blogpost';
import { BlogpostService } from '../../services/blogpost.service';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPostsList$: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) {}

  ngOnInit() {
    this.blogPostsList$ = this.blogPostService.getBlogPosts();
  }

}
