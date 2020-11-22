import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../../../core/services';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private electronService:ElectronService) { }

  ngOnInit() {
  }

  closeWindow(){
    this.electronService.window.close();
  }

  minimizeWindow(){
    this.electronService.window.minimize();
  }
}
