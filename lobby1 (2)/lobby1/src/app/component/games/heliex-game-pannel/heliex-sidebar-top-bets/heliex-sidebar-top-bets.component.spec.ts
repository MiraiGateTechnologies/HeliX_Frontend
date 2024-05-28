import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeliexSidebarTopBetsComponent } from './heliex-sidebar-top-bets.component';

describe('HeliexSidebarTopBetsComponent', () => {
  let component: HeliexSidebarTopBetsComponent;
  let fixture: ComponentFixture<HeliexSidebarTopBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeliexSidebarTopBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeliexSidebarTopBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
