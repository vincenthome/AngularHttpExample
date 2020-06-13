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
  requestId = 1;

  posts: Post[];
  post: Post;

  users: Users;
  user: User;
  userResponse: any;

  constructor(private dal: DalService) { }

  ngOnInit() {
  }

  clear() {
    this.errorMessage = null;
    this.posts = null;
    this.post = null;
    this.users = null;
    this.user = null;
    this.userResponse = undefined;
  }

  getPosts() {
    this.clear();
    this.dal.getPosts().subscribe(
      next => this.posts = next,
      error => this.errorMessage = error
      );
  }

  getPost(id: number) {
    this.clear();
    this.dal.getPost(this.requestId).subscribe(
      next =>  this.post = next,
      error => this.errorMessage = error
    );
  }

  getUsers() {
    this.clear();
    this.dal.getUsers().subscribe(
      next =>  this.users = next,
      error => this.errorMessage = error
    );
  }

  getUser() {
    this.clear();
    this.dal.getUser(this.requestId).subscribe(
      next =>  this.user = next,
      error => this.errorMessage = error
    );
  }

  getDelayedUsers() {
    this.clear();
    this.dal.getDelayedUsers().subscribe(
      next =>  this.users = next,
      error => this.errorMessage = error
    );
  }

  get404Error() {
    this.clear();
    // this will create 404
    this.dal.getUser(23).subscribe(
      next =>  this.user = next,
      error => this.errorMessage = error
    );
  }

  postUser() {
    this.clear();
    this.dal.postUser().subscribe(
      next =>  this.userResponse = next,
      error => this.errorMessage = error
    );
  }

  putUser() {
    this.clear();
    this.dal.putUser(this.requestId).subscribe(
      next =>  this.userResponse = next,
      error => this.errorMessage = error
    );
  }

  patchUser() {
    this.clear();
    this.dal.patchUser(this.requestId).subscribe(
      next =>  this.userResponse = next,
      error => this.errorMessage = error
    );
  }

  deleteUser() {
    this.clear();
    this.dal.deleteUser(this.requestId).subscribe(
      next =>  this.userResponse = next,
      error => this.errorMessage = error
    );
  }
}
