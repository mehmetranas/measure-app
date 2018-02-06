import { TestBed, inject } from '@angular/core/testing';

import { OrderlineService } from './orderline.service';

describe('OrderlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderlineService]
    });
  });

  it('should be created', inject([OrderlineService], (service: OrderlineService) => {
    expect(service).toBeTruthy();
  }));
});
