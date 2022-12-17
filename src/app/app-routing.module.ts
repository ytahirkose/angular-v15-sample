import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CampaignsComponent} from "./pages/campaigns/campaigns.component";
import {NewCampaignComponent} from "./pages/new-campaign/new-campaign.component";
import {LoginComponent} from "./pages/login/login.component";
import {AuthGuard} from "./pages/login/auth.guard";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: '/campaigns', pathMatch: 'full'},
  {path: 'campaigns', component: CampaignsComponent, canActivate: [AuthGuard]},
  {path: 'new-campaign', component: NewCampaignComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
