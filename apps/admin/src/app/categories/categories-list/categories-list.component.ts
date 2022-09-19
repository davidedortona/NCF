import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@ncf/models';
import { CategoriesService } from '@ncf/services';
import { ConfirmationService, MessageService } from 'primeng/api';
@Component({
  selector: 'ncf-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router:Router) { }

  ngOnInit(): void {
    this._getCategories();

                }

  deleteCategory(categoryId: string){
                  this.confirmationService.confirm({
                    message: 'Vuoi davvero eliminare la Categoria?',
                    header: 'Elimina categoria',
                    icon: 'pi pi-exclamation-triangle',
                    accept: () => {
                      this.categoriesService.deleteCategory(categoryId).subscribe(response =>{
                        this._getCategories();
                        this.messageService.add({
                          severity: 'success',
                          summary: 'Success',
                          detail: 'Categoria eliminata con successo!'
                        });
                      },
                      (error) => {
                        this.messageService.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: 'Non è stato possibile eliminare la categoria'
                        });
                      });
                    }/*,
                    reject: () => {
                      
                        this.messageService.add({severity:'error', summary:'Rejected', detail:'Errore Imprevisto'});
                          
                       
                    }  */
                    });
                  
                  }
  
  updateCategory(categoryid: string){
                    this.router.navigateByUrl(`categories/form/${categoryid}`)
                  }
                
              
   private _getCategories() {
                  this.categoriesService.getCategories().subscribe(cats => {
                    this.categories = cats;
                  });
              
     }

     

}
