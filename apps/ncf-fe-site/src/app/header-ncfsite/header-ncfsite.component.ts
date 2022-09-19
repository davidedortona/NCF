import { Component, OnInit } from '@angular/core';
import { VisitorService } from '@ncf/services';

@Component({
  selector: 'ncf-header-ncfsite',
  templateUrl: './header-ncfsite.component.html',
  styles: [
  ]
})
export class HeaderNcfsiteComponent implements OnInit {

  constructor(private visitorService: VisitorService) { }

  ngOnInit(): void {
    this.visitorService.setVisit();
  }

}
