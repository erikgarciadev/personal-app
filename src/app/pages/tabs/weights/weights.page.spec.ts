import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeightsPage } from './weights.page';

describe('WeightsPage', () => {
  let component: WeightsPage;
  let fixture: ComponentFixture<WeightsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(WeightsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
