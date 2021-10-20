import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent implements OnInit {
  public userToShow = {
    firstname: '',
    lastname: '',
    email: '',
    role: [],
    status: []
  };
  public listLink = ["/gestion-utilisateurs/list-utilisateurs"];
  public permissionForm: FormGroup;
  public url = {
    img: "assets/images/user.png",
  };
  // Dropdown pays
  roles: Array<string> = [];
  selectedRole: Array<string> = [];
  dropdownRoleSettings: any = {};
  closeDropdownRoleSelection = false;
  disabledDropdownRole = true;

  // Dropdown pays
  listStatus: Array<string> = [];
  selectedStatus: Array<string> = [];
  dropdownStatusSettings: any = {};
  closeDropdownStatusSelection = false;
  disabledDropdownStatus = true;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.createRoleDropDown();
    this.createStatusDropDown();
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
  createStatusDropDown() {
    this.listStatus = ['Active', 'Deactive'];
    this.selectedStatus = [];
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
  ngOnInit(): void {
    this.initAllValues();
  }

  // Operations
  initAllValues() {
    this.activatedRoute.params.subscribe(
      (success) => {
        this.userService.findUserById(success.id).subscribe(
          (success) => {
            this.selectedRole = [success.role];
            this.selectedStatus = [success.status];
            this.userToShow.firstname = success.firstname;
            this.userToShow.lastname = success.lastname;
            this.userToShow.email = success.email;
            this.userToShow.role = this.selectedRole;
            this.userToShow.status = this.selectedStatus;
            if (success.avatar) {
              this.url.img = success.avatar;
            }
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


}
