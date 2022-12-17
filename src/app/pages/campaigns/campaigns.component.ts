import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CampaignService} from "../../services/campaign.service";

declare let alertify: any;

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements AfterViewInit {
  displayedColumns: string[] = ['point', 'name', 'description', 'createDate', 'buton'];
  dataSource = new MatTableDataSource(this.campaignService.getCampaigns() || []);
  selectedCampaignId: string = '';
  editModalIsOpen: boolean = false;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private campaignService: CampaignService) {
  }

  @ViewChild(MatSort) sort = new MatSort();

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sıralama ${sortState.direction} sonlanıyor`);
    } else {
      this._liveAnnouncer.announce('Sıralama Temizlendi');
    }
  }

  deleteCampaign(id: string) {
    alertify.success(this.campaignService.deleteCampaign(id))
    this.dataSource.data = this.campaignService.getCampaigns() || [];
  }

  editCampaign(id: string) {
    this.selectedCampaignId = id;
    this.editModalIsOpen = true;
  }

  closeModal(e: boolean) {
    this.editModalIsOpen = e;
    this.dataSource.data = this.campaignService.getCampaigns() || [];
  }

}
