import { Component, Signal } from '@angular/core';
import { BaseDetail } from '../../../base-detail';
import { Software } from '../../../models/sites.models';
import { AriaryPipe } from '../../../pipes/pipes.ariary';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-softwares-detail',
  imports: [AriaryPipe, RouterLink],
  templateUrl: './softwares-detail.html',
  styleUrl: './softwares-detail.scss',
})
export class SoftwaresDetail extends BaseDetail<Software>{
  detailData = this.dataService.softwareDataDetail;
  listData = this.dataService.softwareDataList;
  backRoute = "/softwares";
  loadDetail(id: string): void {
    this.dataService.loadSoftwareDataDetail(id);
  }
  loadList(): void {
    this.dataService.loadSoftwareDataList();
  }

}
