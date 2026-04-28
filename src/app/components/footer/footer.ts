import { Component, inject } from '@angular/core';
import { Data } from '../../services/data';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Footer {
  dataService = inject(Data);
}
