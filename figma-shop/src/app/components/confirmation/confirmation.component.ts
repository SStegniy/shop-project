import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {
  public confirmMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  set message(message: string) {
    this.confirmMessage = message;
  }
}
