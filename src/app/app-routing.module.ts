
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoundComponent } from './Components/found/found.component';
import { LostComponent } from './Components/lost/lost.component';
import { DetailsComponent } from './Components/Details/Details.component';
import { SettingComponent } from './Components/Setting/Setting.component';
import { ModalFoundComponent } from './Components/modal-found/modal-found.component';
import { LostDetailsComponent } from './Components/lost-details/lost-details.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { LoginComponent } from './Auth/login/login.component';

const routes: Routes = [
  { path: "", component: FoundComponent },
  { path: "Lost", component: LostComponent },
  { path: "Details/:id", component: DetailsComponent },
  { path: "lostDetails/:id", component: LostDetailsComponent },
  { path: "Setting", component: SettingComponent },
  { path: "modalFound", component: ModalFoundComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
