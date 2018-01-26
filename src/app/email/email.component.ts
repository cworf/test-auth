import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class EmailComponent{

	state: string = '';
	    error: any;

	    constructor(public af: AngularFireAuth ,private router: Router) {
	    this.af.authState.subscribe(auth => {
	      if(auth) {
	        this.router.navigateByUrl('/members');
	      }
	    });
	  }


	  onSubmit(formData) {
	    if(formData.valid) {
	      console.log(formData.value);
		  this.af.auth.createUserWithEmailAndPassword(  //new v4 method https://angularfirebase.com/snippets/angularfire2-version-4-authentication-service/z
			  formData.value.email,
			  formData.value.password
		  ).then(
	        (success) => {
	        console.log(success);
	        this.router.navigate(['/members']);
	      }).catch(
	        (err) => {
	        console.log(err);
	        this.error = err;
	      })
	    }
	  }

}
