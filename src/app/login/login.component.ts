import { Component, OnInit, HostBinding } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn } from '../router.animations';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
	host: {'[@moveIn]': ''}
})
export class LoginComponent {

	error: any;
	    constructor(public af: AngularFireAuth, private router: Router) {  //change to AngularFireAuth

	      this.af.authState.subscribe(auth => { //change to authState
	      if(auth) {
	        this.router.navigateByUrl('/members');
	      }
	    });
	  }

	  loginGoogle() {
	     this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())  //this part changes completely
		 .then(
	        (success) => {
	        this.router.navigate(['/members']);
	      }).catch(
	        (err) => {
	        this.error = err;
	      })
	  }

}
