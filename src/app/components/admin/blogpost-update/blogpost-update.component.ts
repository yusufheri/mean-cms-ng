import { Component, OnInit, ElementRef } from '@angular/core';
import { BlogPost } from '../../../models/blogpost';
import { FormGroup, FormControl, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { BlogpostService } from '../../../services/blogpost.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogpost-update',
  templateUrl: './blogpost-update.component.html',
  styleUrls: ['./blogpost-update.component.css']
})
export class BlogpostUpdateComponent implements OnInit {

  //  editForm: FormGroup;
  blogpost: BlogPost;
  blogpostId: string;

  editForm = new FormGroup({
    title: new FormControl(''),
    subTitle: new FormControl(''),
    content: new FormControl(''),
    image: new FormControl('')
  });

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
   /*  this.editForm = this.formBuilder.group({
      title: '',
      subTitle:  '',
      content: '',
      image: ''
    }); */
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

    this.editForm.value['title'] = this.el.nativeElement.querySelector('#title').value;
    this.editForm.value['subTitle'] = this.el.nativeElement.querySelector('#subTitle').value;
    this.editForm.value['content'] = this.el.nativeElement.querySelector('#content').value;

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
    this.router.navigate(['/admin']);
  }

  handleError(err) {
    console.error('KO handleError - blog post NOT updated', err);
  }

}
