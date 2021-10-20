import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordsEqualValidator } from 'src/app/shared/directives/passwords-equal.directive';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.scss']
})
export class EditUtilisateurComponent implements OnInit {
  public accountForm: FormGroup;
  public permissionForm: FormGroup;
  public userToEdit = new FormData();
  public user = new User();
  public userAvatar: string;


  // Dropdown pays
  roles: Array<string> = [];
  selectedRole: Array<string> = [];
  dropdownRoleSettings: any = {};
  closeDropdownRoleSelection = false;
  disabledDropdownRole = false;

  // Dropdown pays
  listStatus: Array<string> = [];
  selectedStatus: Array<string> = [];
  dropdownStatusSettings: any = {};
  closeDropdownStatusSelection = false;
  disabledDropdownStatus = false;

  isUpdated:boolean = false;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    
  }

  createRoleDropDown() {
    this.roles = ['Admin', 'Vendor', 'Customer'];
    this.selectedRole = [this.user.role];
    this.dropdownRoleSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownRoleSelection
    };
  }
  createStatusDropDown() {
    this.listStatus = ['Active', 'Deactive'];
    this.selectedStatus = [this.user.status];
    this.dropdownStatusSettings = {
      singleSelection: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      closeDropDownOnSelection: this.closeDropdownStatusSelection
    };
  }

  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({
    })
  }

  createUserForm(){
    this.accountForm = this.formBuilder.group({
      firstname: [this.user.firstname, [Validators.required]],
      lastname: [this.user.lastname, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      role: [this.selectedRole, [Validators.required]],
      status: [this.selectedStatus, [Validators.required]],
      avatar: [this.userAvatar, [Validators.required]]
    })
  }


  ngOnInit(): void {
    this.initAllValues();
  }

  // Operations 
  initAllValues() {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.userService.findUserById(success.id).subscribe(
          (success) => {
            this.user = success;
            this.userAvatar = environment.apiEndPoint + success.avatar;
            this.createRoleDropDown();
            this.createStatusDropDown();
            this.createPermissionForm();
            this.createUserForm();
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }
  saveUser() {
    if (this.accountForm.valid) {
      this.getUserValues();
      this.userService.editUser(this.user._id, this.userToEdit).subscribe(
        (success) => {
          this.toastr.success("L'utilisateur a été modifié avec succès", "👌", {
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
    this.userToEdit.append('firstname',this.firstname.value);
    this.userToEdit.append('lastname',this.lastname.value);
    this.userToEdit.append('email',this.email.value);
    this.userToEdit.append('role',this.role.value[0]);
    this.userToEdit.append('status',this.status.value[0]);
    if (this.isUpdated){
      this.userToEdit.append('avatar',this.avatar.value);
    }else{
      this.userToEdit.append('avatar',this.user.avatar);
    }
    
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
  get role() {
    return this.accountForm.get('role');
  }
  get status() {
    return this.accountForm.get('status');
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
      this.userAvatar = reader.result.toString();
      this.avatar.setValue(event.target.files[0]);
      this.isUpdated = true;
    }
  }

}
