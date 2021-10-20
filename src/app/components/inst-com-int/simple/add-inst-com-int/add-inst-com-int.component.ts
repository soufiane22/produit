import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AllowedDate } from 'src/app/shared/directives/allowed-date.directive';
import { InstCommentInt } from 'src/app/shared/model/produit-simple/inst-comment-int.model';
import { InstComIntService } from 'src/app/shared/service/produit-simple/inst-com-int.service';
import { ProduitSimpleService } from 'src/app/shared/service/produit-simple/produit-simple.service';

@Component({
  selector: 'app-add-inst-com-int',
  templateUrl: './add-inst-com-int.component.html',
  styleUrls: ['./add-inst-com-int.component.scss']
})
export class AddInstComIntComponent implements OnInit {
  public instComIntForm: FormGroup;
  public instComIntToAdd = new InstCommentInt();
  constructor(private ngbCalendar: NgbCalendar, private dateAdapter: NgbDateAdapter<string>, private psService: ProduitSimpleService, private instComIntService: InstComIntService, private router: Router, private fb: FormBuilder, private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.createInstComIntForm();
  }

  ngOnInit(): void {

  }

  createInstComIntForm() {
    this.instComIntForm = this.fb.group({
      date: this.fb.control({value:this.today, disabled:false}, [Validators.required, AllowedDate]),
      auteur: this.fb.control({value:'', disabled:false}, [Validators.required]),
      commentaire: this.fb.control({value:'', disabled:false}, [Validators.required])
    });
  }

  get date() {
    return this.instComIntForm.get('date');
  }

  get auteur() {
    return this.instComIntForm.get('auteur');
  }

  get commentaire() {
    return this.instComIntForm.get('commentaire');
  }


  clearValues() {
    this.instComIntForm.reset();
    this.instComIntToAdd = new InstCommentInt();
  }

  addInstComInt() {
    if (this.instComIntForm.valid) {
      this.getValues();
      console.log(this.instComIntToAdd);
      this.instComIntService.addInstCommentInt(this.instComIntToAdd).subscribe(
        (success) => {
          this.toastr.success("L'instance commentaire interne a été ajoutée avec succès", "👌", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
          setTimeout(() => {
            const listUrl = ['inst-com-int/simple/list-inst-com-int'];
            this.router.navigate(listUrl);
          }, 2000);
        },
        (error) => {
          console.log(error);
          this.toastr.error("L'instance commentaire interne  n'a pas pu être ajouté avec succès", "🥵", {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-right'
          });
        })
    } else {
      this.toastr.error("Merci de bien vouloir remplir tous les champs du formulaire", "🥵", {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-right'
      });
    }
  }

  getValues() {
    this.instComIntToAdd.commentaire = this.commentaire.value;
    this.instComIntToAdd.date = this.date.value;
    this.instComIntToAdd.auteur = this.auteur.value;
  }

  get today() {
    return this.dateAdapter.toModel(this.ngbCalendar.getToday())!;
  }

}
