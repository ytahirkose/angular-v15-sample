import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CampaignService} from "../../services/campaign.service";
import {Router} from "@angular/router";

declare let alertify: any;

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {

  _selectedCampaignId: string = '';
  get selectedCampaignId(): string {
    return this._selectedCampaignId;
  }
  @Input() set selectedCampaignId(value: string) {
    if(value) {
      this._selectedCampaignId = value;
      this.setForm();
    }
  }

  campaignForm!: FormGroup;
  alertify = alertify;
  @Output() closeEditPopUp = new EventEmitter<boolean>();

  numberRegex = /^[0-9]+$/;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private campaignService: CampaignService) {
    this.createNewForm()
  }

  ngOnInit(): void {

  }

  createNewForm() {
    const date = new Date()
    this.campaignForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      point: [0, [Validators.required, Validators.min(0)]],
      createDate: [`${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`],
      editDate: [''],
      id: [date.getTime()]
    });
  }

  handleSubmit() {
    alertify.dismissAll()
    if (this.campaignForm.valid) {
      if (this.selectedCampaignId) {
        this.campaignService.editCampaign(this.campaignForm.value);
        alertify.success(`${this.campaignForm.value.name} kampanya başarılı bir şekilde düzenlenmiştir`)
        this.closeEditPopUp.emit(false)
      } else {
        this.campaignService.setNewCampaign(this.campaignForm.value);
        alertify.success(`${this.campaignForm.value.name} kampanya başarılı bir şekilde eklenmiştir`)
        this.router.navigate(['campaigns'])
      }
    } else {
      alertify.error('Lütfen Geçerli Değerler Giriniz!')
    }
  }

  numCheck(e:any) {
    return this.numberRegex.test(e.key)
  }

  setForm() {
    const campaign = this.campaignService.getCampaignById(this.selectedCampaignId);
    this.campaignForm.controls['name'].setValue(campaign.name);
    this.campaignForm.controls['description'].setValue(campaign.description);
    this.campaignForm.controls['point'].setValue(campaign.point);
    this.campaignForm.controls['createDate'].setValue(campaign.createDate);
    this.campaignForm.controls['editDate'].setValue(campaign.editDate);
    this.campaignForm.controls['id'].setValue(campaign.id);
  }
}
