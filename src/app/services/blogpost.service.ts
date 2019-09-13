import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { BlogPost } from '../models/blogpost';
import { SlugifyPipe } from '../pipes/slugify.pipe';


@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  baseUrl = 'http://localhost:4000/api/v1/blog-posts';
  private blogpostCreated = new Subject<string>();

  constructor(private httpClient: HttpClient, private slugifyPipe: SlugifyPipe) { }

  slugify(input: string) {
    return this.slugifyPipe.transform(input);
  }

  uploadImage(formData: FormData) {
    return this.httpClient.post<any>(`${this.baseUrl}/images`, formData);
  }

  createBlogpost(blogpost: BlogPost) {
    blogpost.slug = this.slugify(blogpost.title);
    return this.httpClient.post<BlogPost>(this.baseUrl, blogpost);
  }

  dispatchBlogpostCreated(id: string) {
    this.blogpostCreated.next(id);
  }

  handleBlogpostCreated() {
    return this.blogpostCreated.asObservable();
  }

  /** Get All Blog Posts from MongoDB */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${this.baseUrl}/`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.baseUrl}/${id}`);
  }

  updatedBlogPost(id: string, blogpost: BlogPost) {
    blogpost.slug = this.slugify(blogpost.title);
    // console.log('blogpost', blogpost);
    return this.httpClient.put(`${this.baseUrl}/${id}`, blogpost);
  }

  getDeleteSingleBlogpost(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  getDeleteBlogpost(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/?ids=${allIds}`);
  }
}
