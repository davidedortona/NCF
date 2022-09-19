import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, Event } from '@ncf/models';
import { CategoriesService, EventsService } from '@ncf/services';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators';

@Component({
  selector: 'ncf-event-form',
  templateUrl: './event-form.component.html',
  styles: [
  ]
})
export class EventFormComponent implements OnInit {
  endsubs$ : Subject<void> = new Subject();
  selectedFiles?: FileList;
  form: FormGroup;
  isSubmitted  = false;
  editMode = false;
  events: Event[] = [];
  categories: Category[] = [];
  currentEventID : string;
  imageDisplay: string | ArrayBuffer;
  images: string[] = []; 
  previews: string[] = [];
  arrayOfImages: File[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService : CategoriesService,
    private messageService: MessageService,
    private eventsService: EventsService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      category:['', Validators.required],
      description:['', Validators.required],
      image:['', Validators.required],
      images:[this.previews]
      

    });
  }

  onSubmit(){
    this.isSubmitted = true;
    if(this.form.invalid) return;

    const eventFormData = new FormData();

    Object.keys(this.eventForm).map((key) => {
      console.log(key);
      console.log(this.eventForm[key].value);
      eventFormData.append(key, this.eventForm[key].value);
    });
    if(this.editMode){
      this._updateEvent(eventFormData);
    } else {
      this._addEvent(eventFormData)
      
    }

    //this.router.navigateByUrl('/events');
    
    //productFormData.append()
  }

 onUpdateAlbum(){
  this.isSubmitted = true;
  if(this.editMode){
    if (this.arrayOfImages.length > 1) {
      if(this.arrayOfImages.length > 40){
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:`Non puoi caricare più di 100 immagini alla volta, aggiorna la pagina e ricarica l'album`});
      } else {
        this.eventsService.updateGallery(this.arrayOfImages, this.currentEventID).pipe(takeUntil(this.endsubs$)).subscribe(()=> {
        
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:`l'album è stato creato`
          });
          timer(3000).toPromise().then(() => {
            this.router.navigateByUrl('/events');
            
          });
      });
      }
      
         
      
      
      //this.router.navigateByUrl('/events');
      //this.router.navigate(['/','events']);
      //window.location.reload();
    }else {
      this.messageService.add({
        severity:'error',
        summary:'Error',
        detail:`Nessuna foto caricata in Album`
    });
    } 
  } else {
    this.messageService.add({
      severity:'warn',
      summary:'Warn',
      detail:`Devi prima creare l'Evento! Poi clicca su Carica Album per aggiungere l'album!`
  });
  }
   
/*
    if (this.selectedFiles) {
      /*for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
      this.upload(this.selectedFiles);
    }

    if (file) {
      this.eventsService.updateGallery(file, this.currentEventID, index).subscribe(()=> {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`l'album è stato creato`});
      });
    }else {
      console.log('no file');
    } */
  }

  private _updateEvent(eventFormData: FormData){

  

    this.eventsService.updateEvent(eventFormData, this.currentEventID).subscribe(() => {
      this.messageService.add({severity:'success',summary:'Success',detail:'Event is updated'});
    timer(2000).toPromise().then(() => {
      this.location.back();
    })    
    },
        ()=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'Event is not updated'});
        });

        
    
  }

  private upload(file: File, index: number): void{
    
    if(file){
      this.arrayOfImages.push(file);
    }else {
      console.log('no file');
    }

   /* if (file) {
      this.eventsService.updateGallery(file, this.currentEventID, index).subscribe(()=> {
        this.messageService.add({
          severity:'success',
          summary:'Success',
          detail:`l'album è stato creato`});
      });
    }else {
      console.log('no file');
    } */
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  private _addEvent(eventData: FormData) {
    this.eventsService.createEvent(eventData).subscribe(()=> {
      this.messageService.add({
        severity:'success',
        summary:'Success',
        detail:`l'evento è stato creato`});
        

        timer(2000).toPromise().then(() => {
          
          //this.router.navigateByUrl('/events');
          this.location.back();
          
      });

    }), 
        ()=>{
          this.messageService.add({severity:'error',summary:'Error',detail:'Event is not created'});
        };
  }


  get eventForm() {
    return this.form.controls;
  }

  

 

  onImagesUpload($event){
  
    this.selectedFiles = $event.target.files;

    //this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
       // this.form.patchValue({images: this.selectedFiles[i]});
      // this.form.patchValue({images: this.selectedFiles[i]});
       //this.form.get('images').updateValueAndValidity();
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
          
        };

        reader.readAsDataURL(this.selectedFiles[i]);
        this.upload(this.selectedFiles[i], i);
        //this.eventForm['images'].setValue(this.selectedFiles[i]);
        
      }
    }

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

  _checkEditMode(){
    this.route.params.subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentEventID = params['id'];
        this.eventsService.getEvent(params['id']).subscribe(event => {
          
          this.eventForm['name'].setValue(event['name']);
          this.eventForm['description'].setValue(event['description']);
          this.imageDisplay = event['image'];
          this.eventForm['image'].setValidators([]);
          this.eventForm['image'].updateValueAndValidity();
          this.eventForm['category'].setValue(event['category'].id);
          this.previews = event['images'];
          this.eventForm['images'].setValidators([]);
          this.eventForm['images'].updateValueAndValidity();

        })
      }
    });
  }

}
