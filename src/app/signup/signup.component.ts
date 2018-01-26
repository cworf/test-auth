import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class SignupComponent {

	state: string = '';
	  error: any;

	  constructor(public af: AngularFireAuth, private router: Router) {

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
	        this.router.navigate(['/login'])
	      }).catch(
	        (err) => {
	        console.log(err);
	        this.error = err;
	      })
	    }
	  }

}
