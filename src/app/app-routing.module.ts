import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'home', component: HomeComponent },
  { path:'create_blog', component: CreateBlogComponent},
  { path:'edit_blog/:blogId', component: CreateBlogComponent},
  { path:'blog_details/:blogId', component: BlogDetailsComponent},
  { path:'**', component: ErrorPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
