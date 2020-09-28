import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravlerInfoComponent } from './travler-info.component';

describe('TravlerInfoComponent', () => {
  let component: TravlerInfoComponent;
  let fixture: ComponentFixture<TravlerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravlerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravlerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
