import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostListComponent } from './components/blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';

const routes: Routes = [
  { path: '', component: BlogpostListComponent },
  { path: 'blog-posts/:id', component: BlogpostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
