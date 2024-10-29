import { TestBed } from '@angular/core/testing';

import { NumberReceiverService } from './number-receiver.service';

describe('NumberReceiverService', () => {
  let service: NumberReceiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberReceiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
