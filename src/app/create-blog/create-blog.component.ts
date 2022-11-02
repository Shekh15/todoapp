import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  blogId:any = null;
  blogForm: FormGroup = new FormGroup({});
  singleBlogData:any = null;
  isEdit:any = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute, private datepipe: DatePipe, private formBuilder: FormBuilder, private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {

    this.blogId = parseInt(this.activatedRoute.snapshot.params['blogId']) || 0;
    console.log(this.blogId);

    if(this.blogId){
      this.blogDetails();
      this.isEdit = true;
    }

    this.blogForm = this.formBuilder.group({
 
      title: this.singleBlogData ? [this.singleBlogData.Title,Validators.required] : [null,Validators.required],
      content: this.singleBlogData ? [this.singleBlogData.Content,Validators.required] : [null,Validators.required],
      author: this.singleBlogData ? [this.singleBlogData.AuthorName,Validators.required] : [null, Validators.required],
      publishDate: this.singleBlogData ? [this.datepipe.transform(this.singleBlogData.PublishDate, 'yyyy-MM-dd'),Validators.required] : [null,Validators.required],
      category: this.singleBlogData ? [this.singleBlogData.Category,Validators.required] : ['none', Validators.required]
    });

    console.log(this.blogForm.value);

  }


  blogDetails(){
    this.singleBlogData = this.blogService.selectBlogById(this.blogId);
  }

  updateBlog(){

     let payloadBlogUpdate = {
      BlogId: this.singleBlogData.BlogId,
      Title: this.blogForm.value.title == null || this.blogForm.value.title == "" ?  null : this.blogForm.value.title,
      Content: this.blogForm.value.content == null || this.blogForm.value.content == "" ? null : this.blogForm.value.content,
      AuthorName: this.blogForm.value.author == null || this.blogForm.value.author == "" ? null : this.blogForm.value.author,
      PublishDate: this.blogForm.value.publishDate == null || this.blogForm.value.publishDate == "" ? null : this.blogForm.value.publishDate,
      Category: this.blogForm.value.category == null || this.blogForm.value.category == "" ? null : this.blogForm.value.category
    }

    this.blogService.updateBlogDetails(payloadBlogUpdate);

    this.router.navigate(['home']);

  }


  backToHome(){
    this.router.navigate(['home']);
    
  }

  resetForm(){
    this.blogForm.reset();
  }

  cancel(){
    this.router.navigateByUrl('home');
  }


  addBlogToDatabase(){

    this.submitted = true;

    this.blogForm.addControl('blogId',this.formBuilder.control(''));

    let payloadBlog = {
      BlogId: this.blogForm.value.blogId,
      Title: this.blogForm.value.title == null || this.blogForm.value.title == "" ?  null : this.blogForm.value.title,
      Content: this.blogForm.value.content == null || this.blogForm.value.content == "" ? null : this.blogForm.value.content,
      AuthorName: this.blogForm.value.author == null || this.blogForm.value.author == "" ? null : this.blogForm.value.author,
      PublishDate: this.blogForm.value.publishDate == null || this.blogForm.value.publishDate == "" ? null : this.blogForm.value.publishDate,
      Category: this.blogForm.value.category == null || this.blogForm.value.category == "" ? null : this.blogForm.value.category
    }

    this.blogService.saveBlogData(payloadBlog);

    this.router.navigate(['home']);
  }   



  get Title(){

    return this.blogForm.get('title');
  }

  get Content(){

    return this.blogForm.get('content');
  }

  get Author(){

    return this.blogForm.get('author');
  }

  get publishDate(){

    return this.blogForm.get('publishDate');
  }

  get Category(){

    return this.blogForm.get('Category');
  }

}
