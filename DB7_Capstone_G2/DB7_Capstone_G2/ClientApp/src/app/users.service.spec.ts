import { TestBed } from '@angular/core/testing';

import { NovaService } from './users.service';

describe('NovaService', () => {
  let service: NovaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
