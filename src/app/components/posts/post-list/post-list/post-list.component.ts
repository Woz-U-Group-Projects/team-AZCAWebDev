import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../../../../models/post';
import { PostsService } from 'src/app/modules/services/posts.service';
import { PageEvent } from '@angular/material';

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
  posts: Post[] = [];
  isLoading = false;
  totalChats = 0;
  chatsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.chatsPerPage, this.currentPage);
    this.postsSub = this.postsService
    .getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoading = false;
      this.totalChats = postData.postCount;
      this.posts = postData.posts;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.chatsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.chatsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
    this.postsService.getPosts(this.chatsPerPage, this.currentPage);
     });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

}
