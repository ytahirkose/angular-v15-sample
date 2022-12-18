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

  @Input() selectedCampaignId: string | undefined;
  campaignForm!: FormGroup;
  alertify = alertify;
  @Output() closeEditPopUp = new EventEmitter<boolean>();


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private campaignService: CampaignService) {

  }

  ngOnInit(): void {
    this.createNewForm()
  }

  createNewForm() {
    if (this.selectedCampaignId) {
      const campaign = this.campaignService.getCampaignById(this.selectedCampaignId)
      this.campaignForm = this.formBuilder.group({
        name: [campaign.name, Validators.required],
        description: [campaign.description, Validators.required],
        point: [campaign.point, Validators.required],
        createDate: [campaign.createDate],
        editDate: [campaign.editDate],
        id: [campaign.id]
      });
    } else {
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
  }

  handleSubmit() {
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
      alertify.success('Lütfen Geçerli Değerler Giriniz!')
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
