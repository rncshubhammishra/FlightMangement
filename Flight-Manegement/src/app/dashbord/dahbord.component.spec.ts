import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DahbordComponent } from './dahbord.component';

describe('DahbordComponent', () => {
  let component: DahbordComponent;
  let fixture: ComponentFixture<DahbordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DahbordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DahbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
