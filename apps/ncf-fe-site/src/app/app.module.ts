import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HeaderNcfsiteComponent } from './header-ncfsite/header-ncfsite.component';
import { NavComponent } from './nav/nav.component';
import { BannerComponent } from './banner/banner.component';
import { ButtonModule } from 'primeng/button';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import { EventsComponent } from './pages/events/events.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryIntroComponent } from './category-intro/category-intro.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { ShellComponent } from './shell/shell.component';
import {GalleriaModule} from 'primeng/galleria';
import { AlbumComponent } from './pages/events/album/album.component';
import { TermsComponent } from './pages/terms/terms.component';
const routes: Routes = [
  {
  path:'',
  component: ShellComponent,
  children: [
  { path: '', component: HomePageComponent },
  { path: 'events', component: EventsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'terms', component: TermsComponent },
  { path: '**', component: HomePageComponent }

]}];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderNcfsiteComponent,
    NavComponent, 
    BannerComponent, 
    HomePageComponent, DiscoverComponent, EventsComponent, ContactComponent, FooterComponent, DashboardComponent, CategoryIntroComponent, SidemenuComponent, ShellComponent, AlbumComponent, TermsComponent,
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' }),
    ButtonModule,
    GalleriaModule
    
    ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    HeaderNcfsiteComponent,
    NavComponent,
    BannerComponent,
    HomePageComponent,
    DiscoverComponent,
    EventsComponent,
    ContactComponent,
    FooterComponent,
    DashboardComponent,
    CategoryIntroComponent,
    ShellComponent,
    AlbumComponent,
    
  ],
})
export class AppModule {}
