import { Component, inject, OnInit } from '@angular/core';
import { Data } from '../../services/data';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit{
  dataService = inject(Data);
  ngOnInit(): void {
    this.dataService.loadAboutData();
  }
}
