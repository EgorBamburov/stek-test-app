import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoDetailPage } from './to-do-detail.page';

describe('ToDoDetailPage', () => {
  let component: ToDoDetailPage;
  let fixture: ComponentFixture<ToDoDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
