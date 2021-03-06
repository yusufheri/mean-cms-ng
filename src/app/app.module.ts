import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//  import { NgxEditorModule  } from 'ngx-editor';
import { AngularEditorModule } from '@kolkov/angular-editor';

//  Pipes
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { SlugifyPipe } from './pipes/slugify.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlogpostComponent } from './components/blogpost/blogpost.component';
import { BlogpostListComponent } from './components/blogpost-list/blogpost-list.component';

import { MaterialModule } from './material.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogpostCreateComponent } from './components/admin/blogpost-create/blogpost-create.component';
import { BlogpostUpdateComponent } from './components/admin/blogpost-update/blogpost-update.component';
import { AuthComponent } from './components/auth/auth.component';
import { AddCookieInterceptor } from './_interceptors/add-cookie.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    BlogpostComponent,
    BlogpostListComponent,
    NotFoundComponent,
    AdminComponent,
    BlogpostCreateComponent,
    BlogpostUpdateComponent,
    TruncateTextPipe,
    SlugifyPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule
  ],
  providers: [
    SlugifyPipe,
    { provide: HTTP_INTERCEPTORS, useClass: AddCookieInterceptor, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
