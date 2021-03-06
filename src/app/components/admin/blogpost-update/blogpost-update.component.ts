import { Component, OnInit, ElementRef } from '@angular/core';
import { BlogPost } from '../../../models/blogpost';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BlogpostService } from '../../../services/blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-blogpost-update',
  templateUrl: './blogpost-update.component.html',
  styleUrls: ['./blogpost-update.component.css']
})
export class BlogpostUpdateComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'http://localhost:4000/api/v1/blog-posts/images',
    sanitize: true,
    toolbarPosition: 'top',
};

  //  editForm: FormGroup;
  blogpost: BlogPost;
  blogpostId: string;


  constructor(
      private formBuilder: FormBuilder,
      private blogpostService: BlogpostService,
      private activateRoute: ActivatedRoute,
      private el: ElementRef,
      private router: Router) { }

  ngOnInit() {
    this.blogpostId = this.activateRoute.snapshot.paramMap.get('id');
    this.blogpostService.getBlogPostById(this.blogpostId).subscribe(
      data => this.blogpost = data, error => console.error(error));
  }

  upload() {
    const inputEl = this.el.nativeElement.querySelector('#image');
    const fileCount = inputEl.files.length;
    const formData = new FormData();
    if (fileCount > 0) {
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(
        data => console.log(data), error => console.error(error)
      );
    }
  }

  updateBlogpost(formDirective: FormGroupDirective) {

    /* this.editForm.value['title'] = this.el.nativeElement.querySelector('#title').value;
    this.editForm.value['subTitle'] = this.el.nativeElement.querySelector('#subTitle').value;
    this.editForm.value['content'] = this.el.nativeElement.querySelector('#content').value; 

    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.blogpostService
        .updatedBlogPost(this.blogpost._id, this.editForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    } */
    const editBlogpost = this.blogpost;
    console.log('editBlogpost', editBlogpost);
    this.blogpostService
    .updatedBlogPost(this.blogpost._id, editBlogpost)
    .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
  }

  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - blog post updated', data);
    //  this.editForm.reset();
    formDirective.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
    this.router.navigate(['/admin']);
  }

  handleError(err) {
    console.error('KO handleError - blog post NOT updated', err);
  }

}
