import {Injectable} from '@angular/core';
import {Campaign} from "../models/campaign";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private campaigns: Campaign[] = JSON.parse(String(window.localStorage.getItem('campaigns'))) || []

  private setStoradge = (newCampaigns: Campaign[]) => {
    window.localStorage.setItem('campaigns', JSON.stringify(newCampaigns))
  }

  getCampaigns(): Campaign[] {
    return this.campaigns
  }

  getCampaignById(id: string): Campaign {
    return this.campaigns.filter(campaign => campaign.id == id)[0]
  }

  deleteCampaign(id: string): string {
    this.campaigns = this.campaigns.filter(campaign => campaign.id != id);
    this.setStoradge(this.campaigns)
    return 'Kampanya Silindi';
  }

  setNewCampaign(campaign: Campaign): void {
    this.campaigns.push(campaign);
    this.setStoradge(this.campaigns)
  }

  editCampaign(campaign: Campaign): void {
    this.campaigns[this.campaigns.findIndex(item => item.id == campaign.id)] = campaign;
    this.setStoradge(this.campaigns)
  }
}
