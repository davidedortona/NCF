import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Banner, Category } from '@ncf/models';
import { BannerService, CategoriesService, EventsService, LocalstorageService } from '@ncf/services';
import { Subject } from 'rxjs';
import {  take, takeUntil, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'ncf-events',
  templateUrl: './events.component.html',
  styles: [
  ]
})
export class EventsComponent implements OnInit, OnDestroy {
  category: Category;
  categoryid: any;
  events: Event[] = [];
  allEvents: Event[] = [];
  banners: Banner[] = [];
  show= false;
  endsubs$ : Subject<void> = new Subject();
  categories: Category[] = [];
  eventBanner: Category;
   i = 0;
  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService,
    private route: ActivatedRoute,
    private router: Router,
    private localstorage: LocalstorageService,
    private bannerService: BannerService
    ) { 

      route.params.subscribe(val => {
        // put the code from `ngOnInit` here
        //this._getCategory();
      console.log("POST REFRESH");
      
      this.categoryid = this.localstorage.getCategory();
      this.categoriesService.getCategory(this.categoryid).pipe(takeUntil(this.endsubs$)).subscribe(category => {
        this.category = category;
      });
      this._getEvents(this.categoryid);
      });
      this._getAllEvents();

      

     
     
    }

    showGallery(evento){
      console.log(evento['images']);
      
      this.eventsService.setGallery(evento['images']);
      this.show = true;
      //this.router.navigateByUrl('events/album');
    }

    closeAlbum(){
      this.show = false;
    }

  ngOnInit(): void {
    
   

   
  
      this._getCategory();
      this._getEvents(this.categoryid);
      this.localstorage.setCategory(this.categoryid);
      this.localstorage.setEvent(this.events);
      this._getAllEvents();
      window.scrollTo(0, 0);
      
    
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete(); 
    this.localstorage.removeCategory();
    
  }

  private _getCategory(){
  this.category = this.categoriesService.receiveCategory();
  this.localstorage.setCategoryIntera(this.category);
  if(!this.category){
    this.categoryid = this.localstorage.getCategory();
    console.log("categoryid post refresh " + this.categoryid);
  } else {
    this.categoryid = this.category.id;
  }
    
  
   

  }

  private _getEvents(categoriesFilter?: string[]){

    if(this.category ){
    
      this.eventsService.getEvents(categoriesFilter).pipe(takeUntil(this.endsubs$)).subscribe((events) => {
        this.events = events;
      });
     } else if(this.categoryid){
      this.eventsService.getEvents(categoriesFilter).pipe(takeUntil(this.endsubs$)).subscribe((events) => {
        this.events = events;
      });
     }
    
  }

  
  private _getAllEvents(){

   
   /*  
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(categories=>{
      this.categories = categories;
    });
   
   if(this.categories[10]?.name === 'EVENTI'){
        this.eventBanner = this.categories[this.i];
        console.log('eventbanner: ' + this.eventBanner.name);
      } else {
        console.log('nessun banner');
      }
      console.log('ciclo while');
    */
  
      this.eventsService.getAllEvents().pipe(takeUntil(this.endsubs$)).subscribe((events) => {
        this.allEvents = events;
      });
     
    
  }

}
