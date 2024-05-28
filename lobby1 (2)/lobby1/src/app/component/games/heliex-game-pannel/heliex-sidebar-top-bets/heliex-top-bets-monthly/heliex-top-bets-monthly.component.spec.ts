import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexTopBetsMonthlyComponent } from './heliex-top-bets-monthly.component';

describe('HeliexTopBetsMonthlyComponent', () => {
  let component: HeliexTopBetsMonthlyComponent;
  let fixture: ComponentFixture<HeliexTopBetsMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexTopBetsMonthlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexTopBetsMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
