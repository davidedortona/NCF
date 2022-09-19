import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banner, Category } from '@ncf/models';
import { BannerService, CategoriesService } from '@ncf/services';
import { MessageService } from 'primeng/api';
import { Location } from  '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ncf-banners-form',
  templateUrl: './banners-form.component.html',
  styles: [
  ]
})
export class BannersFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted  = false;
  editMode = false;
  banners: Banner[] = [];
  currentBannerID : string;
  imageDisplay: string | ArrayBuffer;
  categories: Category[] = [];
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  checked = false;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  
  constructor(
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute,
    private categoriesService : CategoriesService) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      tags:[''],
      richDescription:[''],
      image:['', Validators.required],
      isHomeBanner:[this.checked],
      category:['']
      

    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  get bannerForm() {
    return this.form.controls;
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const bannerFormData = new FormData();

    Object.keys(this.bannerForm).map((key) => {
      console.log(key);
      console.log(this.bannerForm[key].value);
      bannerFormData.append(key, this.bannerForm[key].value);
    });

    if(this.editMode){
      this._updateBanner(bannerFormData);
    } else {
      this._addBanner(bannerFormData);
    }

    

  }

  onCancel(){
    this.location.back();
    
  }

  onImageUpload(event){
    console.log(event);
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image: file})
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result
      }
      fileReader.readAsDataURL(file);
      
      
    }
  }

  private _addBanner(bannerData: FormData) {
    this.bannerService.createBanner(bannerData).subscribe((banner: Banner)=> {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`La copertina ${banner.name} è stata creata`});
    timer(2000).toPromise().then(() => {
      this.location.back();
    })    
    },
        ()=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'La copertina non è stata creata'});
        });
  }

  _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentBannerID = params['id'];
        this.bannerService.getBanner(params['id']).subscribe(banner => {
          
          this.bannerForm['name'].setValue(banner.name);
          this.bannerForm['richDescription'].setValue(banner.richDescription);
          this.bannerForm['tags'].setValue(banner.tags);
          this.imageDisplay = banner.image;
          this.bannerForm['image'].setValidators([]);
          this.bannerForm['image'].updateValueAndValidity();
         
          this.bannerForm['category'].setValue(banner.category.id);

          if(banner.isHomeBanner === 'true'){
            this.checked = true;
            this.bannerForm['isHomeBanner'].setValue(this.checked);
          } else {
            this.checked = false;
            this.bannerForm['isHomeBanner'].setValue(this.checked);
          }
         
          

        })
      }
    });
  }

  private _updateBanner(bannerFormData: FormData){
    this.bannerService.updateBanner(bannerFormData, this.currentBannerID).subscribe(() => {
      this.messageService.add({severity:'success',summary:'Success',detail:'La copertina è stata aggiornata'});
    timer(2000).toPromise().then(() => {
      this.location.back();
    })    
    },
        ()=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'La copertina non è stata aggiornata'});
        });
  }





}
