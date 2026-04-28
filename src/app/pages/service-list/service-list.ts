import { Component, OnInit, inject, signal } from '@angular/core';
import { Data } from '../../services/data';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { AriaryPipe } from '../../../pipes/pipes.ariary';
@Component({
  selector: 'app-service-list',
  imports: [ RouterLink, TruncatePipe, AriaryPipe],
  templateUrl: './service-list.html',
  styleUrl: './service-list.scss',
})
export class ServiceList implements OnInit{
  dataService = inject(Data);
  ngOnInit(): void {
    this.dataService.loadServiceDataList();
  }

}
