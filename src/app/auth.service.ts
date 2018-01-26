import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AngularFireAuth, private router: Router) {}

    canActivate(): Observable<boolean> {
      return this.auth.authState //add authState and remove Observable.from due to already being returned as observable
        .take(1)
        .map(state => !!state)
        .do(authenticated => {
      if
        (!authenticated) this.router.navigate([ '/login' ]);
      })
    }

}
