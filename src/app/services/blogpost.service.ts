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

  getBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${this.baseUrl}/blog-posts`);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.baseUrl}/blog-posts/${id}`);
  }
}
