import { TestBed, inject } from '@angular/core/testing';

import { OrderlinePropertyService } from './orderline-property.service';

describe('OrderlinePropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderlinePropertyService]
    });
  });

  it('should be created', inject([OrderlinePropertyService], (service: OrderlinePropertyService) => {
    expect(service).toBeTruthy();
  }));
});
