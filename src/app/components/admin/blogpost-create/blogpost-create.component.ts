import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { BlogpostService } from '../../../services/blogpost.service';

@Component({
  selector: 'app-blogpost-create',
  templateUrl: './blogpost-create.component.html',
  styleUrls: ['./blogpost-create.component.css']
})
export class BlogpostCreateComponent implements OnInit {

  creationForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    subTitle: new FormControl('', [Validators.required, Validators.minLength(2)]) ,
    content: new FormControl('', [Validators.required]),
    image: new FormControl()
  });

  constructor(private blogpostService: BlogpostService, private el: ElementRef) { }

  ngOnInit() {
  }

  createBlogPost(formDirective: FormGroupDirective) {
    if (this.creationForm.valid) {
      this.blogpostService.createBlogpost(this.creationForm.value)
      .subscribe(data => this.handleSuccess(data, formDirective), error => this.handleError(error));
    } else {
      window.alert('Complete form');
    }
  }

  handleSuccess(data, formDirective) {
    console.log('OK blog post created', data);
    this.creationForm.reset();
    formDirective.resetForm();
    this.blogpostService.dispatchBlogpostCreated(data._id);
  }

  handleError(error) {
    console.error('No blog post not created', error);
  }

  upload() {
    const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#image');
    const fileCount = inputEl.files.length;
    if (fileCount > 0) {
      const formData = new FormData();
      formData.append('image', inputEl.files.item(0));
      this.blogpostService.uploadImage(formData).subscribe(data => console.log(data), error => console.log(error));
    }
  }
}
