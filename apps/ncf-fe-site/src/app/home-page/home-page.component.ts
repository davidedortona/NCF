import { Component, OnInit } from '@angular/core';
import { VisitorService } from '@ncf/services';

@Component({
  selector: 'ncf-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  constructor(
    private visitorService: VisitorService
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    
  }

}
