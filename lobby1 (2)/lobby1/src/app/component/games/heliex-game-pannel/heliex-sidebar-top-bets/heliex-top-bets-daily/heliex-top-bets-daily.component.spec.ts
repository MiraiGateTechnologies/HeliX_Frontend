import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexTopBetsDailyComponent } from './heliex-top-bets-daily.component';

describe('HeliexTopBetsDailyComponent', () => {
  let component: HeliexTopBetsDailyComponent;
  let fixture: ComponentFixture<HeliexTopBetsDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexTopBetsDailyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexTopBetsDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
