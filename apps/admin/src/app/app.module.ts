import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AuthGuardService } from '@ncf/services';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component'
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CategoriesService, JwtInterceptor } from '@ncf/services';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  ToastModule } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BannersListComponent } from './banners/banners-list/banners-list.component';
import { BannersFormComponent } from './banners/banners-form/banners-form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {EditorModule} from 'primeng/editor';
import {InputSwitchModule} from 'primeng/inputswitch';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { EventFormComponent } from './events/event-form/event-form.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { LoginComponent } from './pages/login/login.component';
const UX_MODULE = [
  CardModule,
  ToastModule,
  InputTextModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  ConfirmDialogModule,
  InputTextareaModule,
  EditorModule,
  InputSwitchModule,
  TagModule,
  DropdownModule
];


const routes: Routes = [
  {
      path:'',
      component: ShellComponent,
      canActivate: [AuthGuardService],
      children: [
          {
              path:'',
              component: DashboardComponent
          },
          {
            path:'categories',
            component: CategoriesListComponent
          },
          {
            path: 'categories/form',
            component: CategoriesFormComponent
          },
          {
            path:'categories/form/:id',
            component: CategoriesFormComponent
          },
          {
            path:'banners',
            component: BannersListComponent
          },
          {
            path: 'banners/form',
            component: BannersFormComponent
          },
          {
            path:'banners/form/:id',
            component: BannersFormComponent
          },
          {
            path:'events',
            component: EventListComponent
          },
          {
            path: 'events/form',
            component: EventFormComponent
          },
          {
            path:'events/form/:id',
            component: EventFormComponent
          },
          

      ]
      
  },
  {
    
      path:'login',
      component: LoginComponent
    
  }/*,
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }*/
];


@NgModule({
    declarations: [AppComponent, NxWelcomeComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent, CategoriesFormComponent, BannersListComponent, BannersFormComponent, EventFormComponent, EventListComponent, LoginComponent],
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes), ...UX_MODULE],
    providers: [CategoriesService, MessageService, ConfirmationService,  {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}],
    bootstrap: [AppComponent],
    exports: [
      ShellComponent,
      SidebarComponent,
      DashboardComponent,
      CategoriesListComponent,
      BannersListComponent,
      BannersFormComponent,
      EventFormComponent,
      EventListComponent,
      LoginComponent
    ]
})
export class AppModule {}
