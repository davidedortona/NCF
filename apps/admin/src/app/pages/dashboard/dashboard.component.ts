import { Component, OnDestroy, OnInit } from '@angular/core';
import { BannerService, CategoriesService, EventsService, VisitorService } from '@ncf/services';
import { combineLatest, Subject, take, takeUntil } from 'rxjs';
@Component({
  selector: 'ncf-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy{

  statistics = [];
  endsubs$ : Subject<void> = new Subject();
  visits: any;
  constructor(
    private categoriesService: CategoriesService,
    private visitorService: VisitorService,
    private eventsService: EventsService,
    private bannerService: BannerService
  ) { }

  ngOnInit(): void {
/*
    this.bannersService.getBannersCount().pipe(takeUntil(this.endsubs$)).subscribe((count) => {
      this.statistics[0] = count;
      console.log(count);
    });

    this.categoriesService.getCategoriesCount().pipe(takeUntil(this.endsubs$)).subscribe((count) => {
      this.statistics.push(count);
    });

    this.eventsService.getEventsCount().pipe(takeUntil(this.endsubs$)).subscribe((count) => {
      this.statistics.push(count);
    });*/

   

    combineLatest([
      this.bannerService.getBannersCount(),
      this.categoriesService.getCategoriesCount(),
      this.eventsService.getEventsCount(),
      this.visitorService.getVisitsCount()
    ]).pipe(takeUntil(this.endsubs$)).subscribe((values) => {
      this.statistics = values;
      console.log(values[0]);
      console.log(values[1]);
      console.log(values[2]);
      console.log(values[3]);
    });

   

    }

    
  

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  

}


