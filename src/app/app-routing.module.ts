import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogpostListComponent } from './components/blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogpostUpdateComponent } from './components/admin/blogpost-update/blogpost-update.component';

const routes: Routes = [
  { path: '', component: BlogpostListComponent },
  { path: 'admin', component: AdminComponent },
    { path: 'admin/blog-posts/:id', component: BlogpostUpdateComponent },
  { path: 'blog-posts/:id/:slug', component: BlogpostComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
