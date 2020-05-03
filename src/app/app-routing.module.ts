import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MosComponent } from './components/mos/mos.component';
import { TransferComponent } from './components/transfer/transfer.component';




const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path:'home', component: HomeComponent },
  { path:'mos', component: MosComponent },
  { path:'transfer', component: TransferComponent },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
