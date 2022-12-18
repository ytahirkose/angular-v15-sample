import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CampaignService} from "../../services/campaign.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Campaign} from "../../models/campaign";

declare let alertify: any;

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CampaignsComponent implements AfterViewInit {
  displayedColumns: string[] = ['point', 'name', 'description', 'createDate'];
  displayedColumnsWithButtons: string[] = [...this.displayedColumns, 'buttons'];
  dataSource = new MatTableDataSource(this.campaignService.getCampaigns() || []);
  selectedCampaignId: string = '';
  editModalIsOpen: boolean = false;
  isDesktop: boolean = true;

  expandedElement: Campaign | null = null;


  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private campaignService: CampaignService,
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.isDesktop = window.innerWidth > 900;
    if (this.isDesktop) {
      this.displayedColumns = ['point', 'name', 'description', 'createDate'];
      this.displayedColumnsWithButtons = [...this.displayedColumns, 'buttons'];
    } else {
      this.displayedColumns = ['name'];
      this.displayedColumnsWithButtons = [...this.displayedColumns, 'buttons'];
    }
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
    if (confirm('silmek istediğinize emin misiniz?')) {
      alertify.success(this.campaignService.deleteCampaign(id))
      this.dataSource.data = this.campaignService.getCampaigns() || [];
    }
  }

  editCampaign(id: string) {
    this.selectedCampaignId = id;
    this.editModalIsOpen = true;
  }

  closeModal(e: boolean) {
    this.editModalIsOpen = e;
    this.dataSource.data = this.campaignService.getCampaigns() || [];
  }

  setExpandedElement(element:Campaign) {
    if (!this.isDesktop) {
      this.expandedElement = this.expandedElement === element ? null : element
    }
  }

}
