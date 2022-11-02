import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Blogs:any = [];
  constructor(private router: Router,private blogService: BlogService) { }

  ngOnInit(): void {

    this.getBlogDetails();

  }


  createBlog(){
    this.router.navigate(['create_blog']);
  }

  getBlogDetails(){

    this.Blogs = JSON.parse(sessionStorage.getItem('allBlogs') as string);
    console.log(this.Blogs);
  }


  deleteBlog(blogId:any){
    
      this.blogService.deleteBlogById(blogId);
      this.getBlogDetails();
  }


}
