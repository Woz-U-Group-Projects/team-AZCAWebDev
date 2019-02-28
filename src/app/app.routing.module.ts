import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListComponent } from './components/posts/post-list/post-list/post-list.component';
import { PostCreateComponent } from './components/posts/post-create/post-create/post-create.component';
import { LoginComponent } from '../../src/app/components/auth/login/login/login.component';
import { SignupComponent } from '../../src/app/components/auth/login/signup/signup.component';
import { AuthGuardService } from './modules/services/auth-guard.service';


const routes: Routes = [
    { path: '', component: PostListComponent },
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuardService] },
    { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: [AuthGuardService]
})
export class AppRoutingModule {}
