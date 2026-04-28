import { Component, inject, Signal } from '@angular/core';
import { BaseDetail } from '../../../base-detail';
import { Service } from '../../../models/sites.models';
import { RouterLink } from '@angular/router';
import { AriaryPipe } from '../../../pipes/pipes.ariary';

@Component({
  selector: 'app-service-detail',
  imports: [RouterLink, AriaryPipe],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail extends BaseDetail<Service>{
  listData = this.dataService.serviceDataList;
  detailData = this.dataService.serviceDataDetail;
  backRoute = "/services"
  loadList(): void {
    this.dataService.loadServiceDataList();
  }
  loadDetail(id: string): void {
    this.dataService.loadServiceDataDetail(id);
  }
}
