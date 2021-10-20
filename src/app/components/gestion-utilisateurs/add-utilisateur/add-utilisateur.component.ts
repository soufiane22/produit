import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordsEqualValidator } from 'src/app/shared/directives/passwords-equal.directive';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';


@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.scss']
})
export class AddUtilisateurComponent implements OnInit {

  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  public userToAdd = new FormData();
  public url = {
    img: "assets/images/user.png",
  };


  // Dropdown pays
  roles: Array<string> = [];
  selectedRole: Array<string> = [];
  dropdownRoleSettings: any = {};
  closeDropdownRoleSelection = false;
  disabledDropdownRole = false;

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService, private router: Router) {
    this.createRoleDropDown();
    this.createAccountForm();
    this.createPermissionForm();
  }

  createRoleDropDown() {
    this.roles = ['Admin', 'Vendor', 'Customer'];
    this.selectedRole = [];
    this.dropdownRoleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownRoleSelection
    };
  }
  createAccountForm() {
    this.accountForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: [this.selectedRole, [Validators.required]],
      avatar: ['',[Validators.required]]
    }, { validators: PasswordsEqualValidator })
  }
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }


  ngOnInit(): void {
  }

  // Operations 
  saveUser() {
    if (this.accountForm.valid) {
      this.getUserValues();
      this.userService.registerUser(this.userToAdd).subscribe(
        (success) => {
          this.toastr.success("L'utilisateur a été ajouté avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const url = ["/gestion-utilisateurs/list-utilisateurs"]
            this.router.navigate(url)
          }, 1500);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.toastr.error("Merci de bien vouloir remplir le formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  savePermissions() {

  }

  getUserValues() {
    this.userToAdd.append('firstname',this.firstname.value);
    this.userToAdd.append('lastname',this.lastname.value);
    this.userToAdd.append('email',this.email.value);
    this.userToAdd.append('role',this.role.value[0]);    
    this.userToAdd.append('avatar',this.avatar.value);
    this.userToAdd.append('password',this.password.value);
  }

  getPermissionValues() {

  }

  // Getters
  get firstname() {
    return this.accountForm.get('firstname');
  }
  get lastname() {
    return this.accountForm.get('lastname');
  }
  get email() {
    return this.accountForm.get('email');
  }
  get password() {
    return this.accountForm.get('password');
  }
  get confirmPassword() {
    return this.accountForm.get('confirmPassword');
  }
  get role() {
    return this.accountForm.get('role');
  }

  get avatar(){
    return this.accountForm.get('avatar');
  }

  // Inbuilt
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url.img = reader.result.toString();
      this.avatar.setValue(event.target.files[0]);
    }
  }

}
