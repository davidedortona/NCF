import { Component, DoCheck, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner, Category } from '@ncf/models';
import { BannerService, CategoriesService, VisitorService } from '@ncf/services';
import { DiscoverComponent } from '../discover/discover.component';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'ncf-banner',
  templateUrl: './banner.component.html',
  styles: [
  ]
})
export class BannerComponent implements OnInit {
  
  @Input()  n : any;
  public currentIndex = 0;
  banners: Banner[] = [];
  category: Category;
  endsubs$ : Subject<Category> = new Subject();
  constructor(
    private bannerService: BannerService,
    private router: Router,
    private categoriesService: CategoriesService,
    private visitorService : VisitorService
  ) { }

  ngOnInit(): void {
    
    this._getBanners();
    this.n = 0;
    this.categoriesService.getCategory(this.banners[this.currentIndex]?.category.id).subscribe(category => {
      this.category = category;
    });
    this.categoriesService.sendCategory(this.category);
    this.bannerService.sendActualCatID(this.category['id']);
  }

 

  private _getBanners(){

    
    this.bannerService.getBanners().subscribe(banners => {
      this.banners = banners;
    })

    if(this.banners[this.currentIndex]?.isHomeBanner === "true"){
      this.bannerService.sendisHomeBanner('true');
    } else {
      this.bannerService.sendisHomeBanner('false');
    }

   
  }

  changeBanner(index){
    // eslint-disable-next-line prefer-const
    let temp = index + 1;

    if(this.banners[temp]){
      this.setCurrentIndex(temp);
      if(this.banners[temp].isHomeBanner == 'true'){
        this.bannerService.sendisHomeBanner('true');
      } else {
        this.bannerService.sendisHomeBanner('false');
        
        
      }
    } else {
      this.setCurrentIndex(0);
      this.bannerService.sendisHomeBanner('true')
    }

    /*this.categoriesService.getCategory(this.banners[this.currentIndex].category.id).subscribe(category => {
      this.category = category;
    });*/
    //this.categoriesService.sendCategory(this.category);
    this.bannerService.sendActualCatID(this.banners[this.currentIndex].category.id);
    this.categoriesService.sendCategory(this.banners[this.currentIndex].category);
    temp = 0;
    
    
  }

  

   //Current Index Setter
   setCurrentIndex(index){
       this.currentIndex = index;
       console.log(this.currentIndex);
       this.bannerService.sendIndex(this.currentIndex);
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['']);
    }); 
   }

  

}
