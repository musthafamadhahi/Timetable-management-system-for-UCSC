import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, firestore, functions } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgIf } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  
  constructor(
    public  afAuth:  AngularFireAuth, 
    public  router:  Router,
    public firestore: AngularFirestore) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    })
  }
  async  login(email:  string, password:  string) {

    try {
        await  this.afAuth.auth.signInWithEmailAndPassword(email, password)

        // firebase.auth().currentUser.getIdTokenResult(true) 
        // .then((idTokenResult) => {
        // if (idTokenResult.claims.admin) { 
        //   this.router.navigate(['/dashboard']);
        // } else if (idTokenResult.claims.superadmin){
        //   this.router.navigate(['/superadmin']);
        // } else if (idTokenResult.claims.lecturer){
        //   this.router.navigate(['/lecturer']);
        // }
        // })
        // .catch((error) => {
        //   console.log(error);
        // });

        //var role = firestore.collection('users', ref => ref.where('email', '==', email));
        // var usersRef = firestore.collection('users');
        // var role = usersRef.where('email', '==', email);
        // var role = 'lecturer';
        // console.log(role);
        // if(role=='lecturer'){
        //   this.router.navigate(['/lecturer']);
        // }else if(role=='admin'){
        //   this.router.navigate(['/dashboard']);
        // }else if(role=='superadmin'){
        //   this.router.navigate(['/dashboard']);
        // }
        this.router.navigate(['/dashboard']);
        
    } catch (e) {
        alert('Error!'  +  e.message);
    }
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const addLecturerRole = functions.httpsCallable('addLecturerRole');
      addLecturerRole({email : result.user.email}).then(result => {
        console.log(result);
      })
    //this.SetUserData(result.user);
    }).catch((error) => {
    window.alert(error.message)
    })
    }

  async logout(){
      await this.afAuth.auth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['']);
  }
  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}
}
