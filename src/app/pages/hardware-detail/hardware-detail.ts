import { Component, Signal } from '@angular/core';
import { BaseDetail } from '../../../base-detail';
import { Hardware } from '../../../models/sites.models';
import { AriaryPipe } from '../../../pipes/pipes.ariary';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-hardware-detail',
  imports: [AriaryPipe, RouterLink],
  templateUrl: './hardware-detail.html',
  styleUrl: './hardware-detail.scss',
})
export class HardwareDetail extends BaseDetail<Hardware>{
  detailData = this.dataService.hardwareDataDetail;
  listData = this.dataService.hardwareDataList;
  backRoute = "/hardwares";
  loadDetail(id: string): void {
    this.dataService.loadHardwareDataDetail(id);
  }
  loadList(): void {
    this.dataService.loadHardwareDataList();
  }

}
