import { Component, OnInit } from '@angular/core';
import { DalService } from '../services/dal.service';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { User, Users } from '../models/user';

@Component({
  selector: 'app-my-http-observable',
  templateUrl: './my-http-observable.component.html',
  styleUrls: ['./my-http-observable.component.css']
})
export class MyHttpObservableComponent implements OnInit {

  errorMessage: string;

  posts: Post[];
  post: Post;

  users: Users;
  user: User;

  constructor(private dal: DalService) { }

  ngOnInit() {
    this.dal.getPosts().subscribe(
      next => this.posts = next,
      error => this.errorMessage = error
      );
    this.dal.getPost(4).subscribe(
      next =>  this.post = next,
      error => this.errorMessage = error
    );

    this.dal.getUsers().subscribe(
      next =>  this.users = next,
      error => this.errorMessage = error
    );

    this.dal.getUser(2).subscribe(
      next =>  this.user = next,
      error => this.errorMessage = error
    );
  }

}
