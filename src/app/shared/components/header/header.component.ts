import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user.model';
import { AuthentificationService } from '../../service/authentification.service';
import { NavService } from '../../service/nav.service';


interface Language {
  code: string,
  name: string,
  iso: string
}
const CODE_NAMES = {
  'gb': 'English',
  'fr': 'French',
  'ar': 'Arabic'
}

const LOCALES: Language[] = [
  { code: 'en', name: 'English', iso: 'gb' },
  { code: 'fr', name: 'French', iso: 'fr' },
  { code: 'ar', name: 'Arabic', iso: 'ma' }
]
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public right_sidebar: boolean = false;
  public open: boolean = false;
  public openNav: boolean = false;
  public isOpenMobile: boolean;
  public lang: Language;
  public locales: Language[] = LOCALES;
  public connectedUser: User;
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(private toastr: ToastrService, public navServices: NavService, private authService: AuthentificationService, private router: Router) {
  }

  collapseSidebar() {
    this.open = !this.open;
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  }
  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }


  changeLanguage(lang: Language) {
    ;
    localStorage.setItem('code', lang.code);
    localStorage.setItem('name', lang.name);
    localStorage.setItem('iso', lang.iso);
    window.location.reload();
  }
  ngOnInit() {
    const code = localStorage.getItem('code') || 'en';
    const name = localStorage.getItem('name') || 'English';
    const iso = localStorage.getItem('iso') || 'gb';
    this.lang = {
      code: code,
      name: name,
      iso: iso
    }
    this.locales = this.locales.filter(locale => locale.code !== code && locale.name !== name && locale.iso !== iso);
   
  }

  logoutUser() {
    this.authService.logout();
    this.toastr.success("Vous avez été deconnecté avec succès", "👌", {
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    });
    setTimeout(() => {
      const url = ['/authentification/connexion'];
      this.router.navigate(url);
    }, 1500);
  }

}
