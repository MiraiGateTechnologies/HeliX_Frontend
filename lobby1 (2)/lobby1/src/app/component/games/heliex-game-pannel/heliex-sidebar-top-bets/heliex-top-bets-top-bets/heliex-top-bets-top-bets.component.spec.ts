import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexTopBetsTopBetsComponent } from './heliex-top-bets-top-bets.component';

describe('HeliexTopBetsTopBetsComponent', () => {
  let component: HeliexTopBetsTopBetsComponent;
  let fixture: ComponentFixture<HeliexTopBetsTopBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexTopBetsTopBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexTopBetsTopBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
