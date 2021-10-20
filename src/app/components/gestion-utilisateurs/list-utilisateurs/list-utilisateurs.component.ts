import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { utilisateurHeaders } from 'src/app/shared/helpers/data.helper';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-utilisateurs',
  templateUrl: './list-utilisateurs.component.html',
  styleUrls: ['./list-utilisateurs.component.scss']
})
export class ListUtilisateursComponent implements OnInit {
  public headers: Array<string>;
  public listUtilisateurs: Array<User>;
  public userToDelete: string;
  public closeResult: string;

  constructor(private modalService: NgbModal, private toastr: ToastrService, private userService: UserService, private router: Router) {
    this.initValues();
  }

  initValues(){
    this.headers = utilisateurHeaders;
    this.listUtilisateurs = [];
  }
  ngOnInit(): void {
    this.getAllUsers();
  }

  // Operations
  onClickEdit(id: String) {
    const editUrl = ['gestion-utilisateurs/edit-utilisateur', id];
    this.router.navigate(editUrl);
  }

  onClickShow(id: String) {
    const detailUrl = ['gestion-utilisateurs/details-utilisateur', id];
    this.router.navigate(detailUrl);
  }

  goToaddUser(){
    const addUrl = ['gestion-utilisateurs/add-utilisateur'];
    this.router.navigate(addUrl);
  }

  setUserToDelete(id: string) {
    this.userToDelete = id;
  }

  onClickDelete(){
    this.userService.deleteUser(this.userToDelete).subscribe(
      (success)=>{
        this.toastr.success("L'utilisateur a été supprimé avec succès", '😄', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'

        });
        setTimeout(() => {
          this.getAllUsers();
        }, 1000);

      },
      (error)=>{
        console.log(error);
        this.toastr.error("L'utilisateur n'a pas été supprimé avec succès", "😞", {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-right'
        });
      }
    )
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      (success)=>{
        this.listUtilisateurs = success.map(x=>{
          x.avatar = environment.apiEndPoint + x.avatar;
          return x;
        });
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  // Inbuild
  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
