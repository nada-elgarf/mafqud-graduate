import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from  '@angular/common/http';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';



import { AppComponent } from './app.component';
import { SidebarComponent } from './Components/Sidebar/Sidebar.component';
import { FoundComponent } from './Components/found/found.component';
import { LostComponent } from './Components/lost/lost.component';
import { SettingComponent } from './Components/Setting/Setting.component';
import { DetailsComponent } from './Components/Details/Details.component';
import { NavbarComponent } from './Components/Navbar/Navbar.component';
import { ModalFoundComponent } from './Components/modal-found/modal-found.component';
import { ModalLostComponent } from './Components/modal-lost/modal-lost.component';
import { LostDetailsComponent } from './Components/lost-details/lost-details.component';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FoundComponent,
    LostComponent,
    SettingComponent,
    DetailsComponent,
    ModalFoundComponent,
    ModalLostComponent,
    LostDetailsComponent,
    LoginComponent,
    SignUpComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [NgbActiveModal ],
  bootstrap: [AppComponent]
})
export class AppModule { }
