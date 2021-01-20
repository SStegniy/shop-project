import { Component, OnInit } from '@angular/core';
import { UserInterface } from '../../../shared/interfaces/user.interface';
import { AdminProductService } from '../../../shared/services/admin-product.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public user: UserInterface;

  constructor(private adminService: AdminProductService) { }

  ngOnInit(): void {
    this.user = this.getUserData();
  }

  private getUserData(): UserInterface {
    return this.adminService.getAuthUser();
  }
}
