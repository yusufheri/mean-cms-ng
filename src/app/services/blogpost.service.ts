import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blogpost';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {
  baseUrl = 'http://localhost:4000/api/v1';

  constructor(private httpClient: HttpClient) { }

  /** Get All Blog Posts from MongoDB */
  getBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${this.baseUrl}/blog-posts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.baseUrl}/blog-posts/${id}`);
  }

  getDeleteSingleBlogpost(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/${id}`);
  }

  getDeleteBlogpost(ids: string[]) {
    const allIds = ids.join(',');
    return this.httpClient.delete(`${this.baseUrl}/blog-posts/?ids=${allIds}`);
  }
}
