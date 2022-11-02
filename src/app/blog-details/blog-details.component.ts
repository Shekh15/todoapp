import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blogId:any;
  singleBlogData:any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogId = this.activatedRoute.snapshot.params['blogId'];

    this.blogDetails();

  }

  blogDetails(){
    this.singleBlogData = this.blogService.selectBlogById(this.blogId);
    console.log(this.singleBlogData);
  }

  backToHome(){
    this.router.navigate(['home']);
  }
  

}
