import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { RouterLink } from '@angular/router';
import { AriaryPipe } from '../../../pipes/pipes.ariary';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-software-list',
  imports: [RouterLink, AriaryPipe, TruncatePipe],
  templateUrl: './software-list.html',
  styleUrl: './software-list.scss',
})
export class SoftwareList implements OnInit{
  dataService = inject(Data);
  ngOnInit(): void {
    this.dataService.loadSoftwareDataList();
  }
}
