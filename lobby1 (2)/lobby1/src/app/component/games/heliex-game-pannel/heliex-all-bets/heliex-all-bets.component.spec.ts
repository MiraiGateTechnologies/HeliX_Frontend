import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexAllBetsComponent } from './heliex-all-bets.component';

describe('HeliexAllBetsComponent', () => {
  let component: HeliexAllBetsComponent;
  let fixture: ComponentFixture<HeliexAllBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexAllBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexAllBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
