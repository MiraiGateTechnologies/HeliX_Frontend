import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexTopBetsAllComponent } from './heliex-top-bets-all.component';

describe('HeliexTopBetsAllComponent', () => {
  let component: HeliexTopBetsAllComponent;
  let fixture: ComponentFixture<HeliexTopBetsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexTopBetsAllComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexTopBetsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
