import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Banner } from '@ncf/models';
import { BannerService } from '@ncf/services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';
@Component({
  selector: 'ncf-banners-list',
  templateUrl: './banners-list.component.html',
  styles: [
  ]
})
export class BannersListComponent implements OnInit, OnDestroy {
  endsubs$ : Subject<void> = new Subject();
  banners: Banner[] = [];
  constructor(
    private bannerService: BannerService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._getBanners();
  }

  deleteBanner(bannerid: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Product?',
      header: 'Delete Product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bannerService.deleteBanner(bannerid).subscribe(
          () => {
            this._getBanners();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Il banner è stato cancellato'
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'banner is not deleted!'
            });
          }
        );
      }
    });
  }

  updateBanner(bannerid: string ){
    this.router.navigateByUrl(`banners/form/${bannerid}`)
  }

  private _getBanners(){
    this.bannerService.getBanners().pipe(takeUntil(this.endsubs$)).subscribe(banners => {
      this.banners = banners;
    })
  }

  ngOnDestroy(): void {
    this.endsubs$.next();
    this.endsubs$.complete(); 
  }


}
