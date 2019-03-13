import { TestBed } from '@angular/core/testing';

import { UiStateService } from './ui-state.service';

describe('UiStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiStateService = TestBed.get(UiStateService);
    expect(service).toBeTruthy();
  });
});
