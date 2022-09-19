import {  Component, DoCheck,  OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Banner, Category } from '@ncf/models';
import { BannerService, CategoriesService } from '@ncf/services';
import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ncf-discover',
  templateUrl: './discover.component.html',

})
export class DiscoverComponent implements OnInit, OnDestroy, DoCheck {
  endsubs$ : Subject<void> = new Subject();
  var:any;
  id:any;
  homepage = "true";
  categories: Category[] = [];
  category:Category;
  banners: Banner[] = []; 
  constructor(
    private categoriesService: CategoriesService,
    private bannerService: BannerService,
    private router: Router
   
  ) { }

  ngOnInit(): void {
    this._getCategory();
    this.bannerService.sendisHomeBanner('true');
    this._getCategories();
    this.id = this.bannerService.getActualCatID();
    
  //  this._chooseComponent();

   
  }

   ngDoCheck(): void {
    this._chooseComponent();
    
  }

 

  

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories
    })

    
  }

  private _getCategory(){
    this.category = this.categoriesService.receiveCategory();
  }

  

  public _chooseComponent(){
    this.var =  this.bannerService.receiveIndex();
    this.homepage = this.bannerService.receiveishomeBanner();
    this.id = this.bannerService.getActualCatID();
    this._getCategory();
   /* this.bannerService.getBanners().pipe(takeUntil(this.endsubs$)).subscribe(banner =>{
      if(banner[this.var[0]].isHomeBanner == true){
        this.homepage = true;
      } else {
        this.homepage = false;
      };
      console.log(this.homepage);
      //console.log(banner[this.var].isHomeBanner)
    })*/
    //console.log(this.var);
    //console.log(this.homepage);
  }


  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete(); 
  }

  findMore(category: Category){
    this.categoriesService.sendCategory(category);
    this.router.navigateByUrl('/events');
  }



}
