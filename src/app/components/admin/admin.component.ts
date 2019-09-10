import { Component, OnInit } from '@angular/core';
import { BlogpostService } from 'src/app/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/models/blogpost';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  blogPostsList$: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) {}

  ngOnInit() {
    this.blogPostsList$ = this.blogPostService.getBlogPosts();
    this.blogPostsList$.forEach((blogPost) => {
      console.log(blogPost);
    });
  }


}
