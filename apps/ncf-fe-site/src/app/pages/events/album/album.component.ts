import { Component, Input, OnInit } from '@angular/core';
import { EventsService } from '@ncf/services';


@Component({
  selector: 'ncf-album',
  templateUrl: './album.component.html',
  styles: [
  ]
})
export class AlbumComponent implements OnInit {

  last:any;
  selectedImageUrl: string;
  i = 0;
  @Input() images: string[];
  constructor(
    private eventService: EventsService
  ) { }

  ngOnInit(): void {
    this.images = this.eventService.getGallery();
    console.log("ALBUM " + this.images);
    if(this.hasImages){
      this.selectedImageUrl = this.images[0]
    }

    this.last = this.images.length - 1;
     window.scrollTo(0, 0);
  }

  changeBackImagefromButton(){
    this.i--;
    if(this.images[this.i]){
      this.selectedImageUrl = this.images[this.i];
      console.log('image back');
    }else {
      this.i = this.last;
      this.selectedImageUrl = this.images[this.i];
    }
  }

  changeSelectedImage(i: any){
    this.i = i;
    this.selectedImageUrl = this.images[i];
  }

  changeSelectedImagefromButton(){
    this.i++;
    if(this.images[this.i]){
      this.selectedImageUrl = this.images[this.i];
      console.log('image changed from button');
    } else {
      this.i = 0;
      this.selectedImageUrl = this.images[this.i];
    }
    
  }

  get hasImages(){
    return this.images?.length > 0;
  }

}
