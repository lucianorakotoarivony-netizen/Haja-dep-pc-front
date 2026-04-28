import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwaresDetail } from './softwares-detail';

describe('SoftwaresDetail', () => {
  let component: SoftwaresDetail;
  let fixture: ComponentFixture<SoftwaresDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwaresDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwaresDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
