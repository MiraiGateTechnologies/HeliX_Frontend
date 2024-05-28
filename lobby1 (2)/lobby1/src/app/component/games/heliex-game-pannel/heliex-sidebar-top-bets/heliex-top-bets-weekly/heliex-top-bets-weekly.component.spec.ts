import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexTopBetsWeeklyComponent } from './heliex-top-bets-weekly.component';

describe('HeliexTopBetsWeeklyComponent', () => {
  let component: HeliexTopBetsWeeklyComponent;
  let fixture: ComponentFixture<HeliexTopBetsWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexTopBetsWeeklyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexTopBetsWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
