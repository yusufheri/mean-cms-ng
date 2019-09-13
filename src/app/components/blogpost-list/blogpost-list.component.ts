import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../../models/blogpost';
import { BlogpostService } from '../../services/blogpost.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  blogPostsList$: Observable<BlogPost[]>;
  imagePath = environment.imageDir;
  imageDefault = 'https://fakeimg.pl/300/?text=frameworks';

  constructor(private blogPostService: BlogpostService) {}

  ngOnInit() {
    this.blogPostsList$ = this.blogPostService.getBlogPosts();
  }

  onLike(post: BlogPost) {
    this.blogPostService.likePost(post);
  }

  onDislike(post: BlogPost) {
    this.blogPostService.disLike(post);
  }

}
