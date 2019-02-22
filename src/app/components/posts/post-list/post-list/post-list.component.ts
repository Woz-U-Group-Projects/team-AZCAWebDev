import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../../../models/post';
import { PostsService } from 'src/app/modules/services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
 // posts = [
 //   { title: 'First Chat Post', content: 'This is the first AZCA Chat\'s content' },
 //   { title: 'Second Chat Post', content: 'This is the second AZCA Chat\'s content' },
 //   { title: 'Third Chat Post', content: 'This is the third AZCA Chat\'s content' },
 // ];
  posts: Post [] = [];
  isLoading = false;
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.isLoading = false;
      this.posts = posts;
    });
  }

  onDelete(postId: string) {
     this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
