import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Category } from '@ncf/models';
import { BannerService, CategoriesService } from '@ncf/services';


@Component({
  selector: 'ncf-category-intro',
  templateUrl: './category-intro.component.html',
  styles: [
  ]
})
export class CategoryIntroComponent implements OnInit, DoCheck {

  homepage:any;
  //var: any;
  id:any;
 category: any; 
  constructor(
    private bannerService: BannerService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.homepage = this.bannerService.receiveishomeBanner();
    //this.var = this.bannerService.receiveIndex();
    this.bannerService.getActualCatID();
    console.log(this.homepage);
    this._getCategory();
  }

  ngDoCheck(): void {
    this._chooseComponent();
  }


  public _chooseComponent(){
    
    this.homepage = this.bannerService.receiveishomeBanner();
    this.id = this.bannerService.getActualCatID();
    this._getCategory();
  }


  private _getCategory(){
    this.category = this.categoryService.receiveCategory();
    
    //this.category = this.categoryService.getCategory(this.id);
  }

 

}
