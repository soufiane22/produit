import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentificationService } from 'src/app/shared/service/authentification.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  public loginForm: FormGroup;
  public userToLogin = {
    email:'',
    password:''
  }
  public registerForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private toastr: ToastrService, private authService: AuthentificationService) {
    this.createLoginForm();
    this.createRegisterForm();
  }

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    }
  ]
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: [''],
      password: [''],
      confirmPassword: [''],
    })
  }

  getValues(){
    this.userToLogin.email=this.loginForm.value.email;
    this.userToLogin.password=this.loginForm.value.password;
  }


  ngOnInit() {
  }

  onSubmit() {

  }

  loginUser(){
    if (this.loginForm.valid){
      this.getValues();
      this.authService.authenticateUser(this.userToLogin).subscribe(
        (data)=>{
          if (data.success){
            this.authService.storeUserData(data.token, data.user);
            this.toastr.success("L'utilisateur a été authentifié avec succès", "👌", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
            setTimeout(() => {
              const url = ["/dashboard/default"]
              this.router.navigate(url)
            }, 1500);
          }else{
            this.toastr.error(data.msg, "🥵", {
              timeOut: 2000,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-right'
            });
          }

        },
        (error)=>{
          console.log(error);
        }
      );
    }else{
      this.toastr.error("L'opération a échoué", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
