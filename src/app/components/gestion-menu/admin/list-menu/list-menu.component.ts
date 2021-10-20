import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { Menu } from 'src/app/shared/model/menu.model';
import { MenuService } from 'src/app/shared/service/menu.service';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss']
})
export class ListMenuComponent implements OnInit {

  public menuList: Menu[];
  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }

  getAllMenu() {
    this.menuService.get_all_menu().subscribe(
      (success) => {
        this.menuList = success;
      },
      (error) => {
        console.log(error);
      });
  }

}
