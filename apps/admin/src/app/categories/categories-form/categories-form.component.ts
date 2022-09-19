import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '@ncf/services';
import { Category } from '@ncf/models';
import { MessageService } from 'primeng/api';
import { Location} from '@angular/common';
import { timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'ncf-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;
  editMode= false;
  categories: Category[] = [];
  currentCategoryID: string;
  imageDisplay: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private location: Location,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      id: this.currentCategoryID,
      name:['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });

    this._checkEditMode();

  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const categoryFormData = new FormData();

    Object.keys(this.categoryForm).map((key) => {
      console.log(key);
      console.log(this.categoryForm[key].value);
      categoryFormData.append(key, this.categoryForm[key].value);
    });

    //this._addCategory(categoryFormData)


    if(this.editMode){
      this._updateCategory(categoryFormData);
    }else {
      this._addCategory(categoryFormData);
    }

  }

  back(){
    this.router.navigateByUrl('categories');
  }

  private _addCategory(categoryData: FormData) {
    this.categoriesService.createCategory(categoryData).subscribe((category: Category) => {
      this.messageService.add({severity:'success',summary:'Success',detail:'La Categoria è stata creata'});
    timer(2000).toPromise().then(done => {
      this.location.back();
    })    
    },
        (error)=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'La categoria non è stata creata.'});
        });
  }


  private _updateCategory(categoryData: FormData){
    this.categoriesService.updateCategory(categoryData, this.currentCategoryID).subscribe((category: Category) => {
      this.messageService.add({severity:'success',summary:'Success',detail:'La Categoria è stata aggiornata'});
    timer(2000).toPromise().then(done => {
      this.location.back();
    })    
    },
        (error)=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'La Categoria non è stata aggiornata'});
        });
  }

  _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentCategoryID = params['id'];
        this.categoriesService.getCategory(params['id']).subscribe(category => {
          
          this.categoryForm['name'].setValue(category.name);
          this.categoryForm['description'].setValue(category.description);
          this.imageDisplay = category.image;
          this.categoryForm['image'].setValidators([]);
          this.categoryForm['image'].updateValueAndValidity();
        })
      }
    });
  }


  get categoryForm(){
    return this.form.controls;
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




}
