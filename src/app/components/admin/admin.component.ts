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

  //  blogPostsList$: Observable<BlogPost[]>;
  allBlogposts: BlogPost[];

  constructor(private blogPostService: BlogpostService) {}

  ngOnInit() {
    //  this.blogPostsList$ = this.blogPostService.getBlogPosts();
    this.blogPostService.getBlogPosts().subscribe(data => this.refresh(data) );
  }

  deleteBlogPosts(selectionOptions) {
    const ids = selectionOptions.map(so => so.value );
    if (ids.length === 1) {
      this.blogPostService.getDeleteSingleBlogpost(ids[0]).subscribe(
        data => this.refresh(data), err => console.error(err)
      );
    } else {
      this.blogPostService.getDeleteBlogpost(ids).subscribe(
        data => this.refresh(data), err => console.error(err)
      );
    }
  }

  refresh(data) {
    //  console.log(data);
    this.blogPostService.getBlogPosts().subscribe(result => {
      this.allBlogposts = result;
    });
  }
}
