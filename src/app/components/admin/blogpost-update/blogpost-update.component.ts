import { Component, OnInit, ElementRef } from '@angular/core';
import { BlogPost } from '../../../models/blogpost';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BlogpostService } from '../../../services/blogpost.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blogpost-update',
  templateUrl: './blogpost-update.component.html',
  styleUrls: ['./blogpost-update.component.css']
})
export class BlogpostUpdateComponent implements OnInit {

  editForm: FormGroup;
  blogpost: BlogPost;
  blogpostId: string;

  constructor(
      private formBuilder: FormBuilder,
      private blogpostService: BlogpostService,
      private activateRoute: ActivatedRoute,
      private el: ElementRef) { }

  ngOnInit() {
    this.blogpostId = this.activateRoute.snapshot.paramMap.get('id');
    this.blogpostService.getBlogPostById(this.blogpostId).subscribe(
      data => this.blogpost = data, error => console.error(error));
    this.editForm = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle:  ['', Validators.required],
      content:  ['', Validators.required],
      image: ''
    });
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
    if (this.editForm.valid) {
      console.log(this.editForm.value);
      this.blogpostService
        .updatedBlogPost(this.blogpost._id, this.editForm.value)
        .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    }
  }

  handleSuccess(data, formDirective) {
    console.log('OK handleSuccess - blog post updated', data);
    this.editForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }

  handleError(err) {
    console.error('KO handleError - blog post NOT updated', err);
  }

}
