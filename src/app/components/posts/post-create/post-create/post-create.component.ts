import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from 'src/app/modules/services/posts.service';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  post: Post;
  isLoading = false;
  private mode = 'create';
  private chatId: string;

  constructor(
      public postsService: PostsService,
      public route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('postId')) {
            this.mode = 'edit';
            this.chatId = paramMap.get('postId');
            this.isLoading = true;
            this.postsService.getPost(this.chatId).subscribe(postData => {
                this.isLoading = false;
                this.post = { id: postData._id, title: postData.title, content: postData.content};
            });
        } else {
            this.mode = 'create';
            this.chatId = null;
        }
    });
}

  onSavePost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
        this.postsService.addPost(form.value.title, form.value.content);
    } else {
        this.postsService.updatePost(
            this.chatId,
            form.value.title,
            form.value.content
        );
    }
    form.resetForm();
    }
}
