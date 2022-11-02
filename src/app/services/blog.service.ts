import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  temp:any [] = [];
  id: any = 1;
  allBlogs:any[] = [];

  constructor() { }

  saveBlogData(blogData: any){

    this.temp = JSON.parse(sessionStorage.getItem('allBlogs') as string) == null ? [] : JSON.parse(sessionStorage.getItem('allBlogs') as string);
    blogData.BlogId = this.temp.length == 0 ? this.id : JSON.parse(sessionStorage.getItem('allBlogs') as string).at(-1).BlogId + 1;
    this.temp.push(blogData);
    sessionStorage.setItem('allBlogs', JSON.stringify(this.temp));
    
  }

  selectBlogById(blogId:any){
  
    this.allBlogs = JSON.parse(sessionStorage.getItem('allBlogs') as string);
    
    return(this.allBlogs.find(blog => blog.BlogId === parseInt(blogId)));

  }

  deleteBlogById(blogId: any){
  
    this.allBlogs = JSON.parse(sessionStorage.getItem('allBlogs') as string);

    let index = this.allBlogs.findIndex(blog => blog.BlogId === parseInt(blogId));
     
     if(this.allBlogs.length > 1){
        this.allBlogs.splice(index,1);
        sessionStorage.setItem('allBlogs', JSON.stringify(this.allBlogs));
      }else{
        this.allBlogs.splice(index,1);
        sessionStorage.clear();
      }
  }

  updateBlogDetails(blogUpdatedData:any){
    
    this.allBlogs = JSON.parse(sessionStorage.getItem('allBlogs') as string);

    for (let i = 0; i < this.allBlogs.length; i++){

        if(blogUpdatedData.BlogId == this.allBlogs[i].BlogId)
        {
          this.allBlogs[i].Title = blogUpdatedData.Title;
          this.allBlogs[i].Content = blogUpdatedData.Content;
          this.allBlogs[i].AuthorName = blogUpdatedData.AuthorName;
          this.allBlogs[i].PublishDate = blogUpdatedData.PublishDate;
          this.allBlogs[i].Category = blogUpdatedData.Category;
        }
    }
    sessionStorage.setItem('allBlogs', JSON.stringify(this.allBlogs));
  }

}
