import { TestBed } from '@angular/core/testing';

import { ToDoPageService } from './to-do-page.service';

describe('ToDoPageService', () => {
  let service: ToDoPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
