import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';
import { AriaryPipe } from '../../../pipes/pipes.ariary';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../../pipes/truncate.pipe';

@Component({
  selector: 'app-hardware-list',
  imports: [RouterLink, AriaryPipe, TruncatePipe],
  templateUrl: './hardware-list.html',
  styleUrl: './hardware-list.scss',
})
export class HardwareList implements OnInit{
  dataService =inject(Data);
  ngOnInit(): void {
    this.dataService.loadHardwareDataList();
  }
}
