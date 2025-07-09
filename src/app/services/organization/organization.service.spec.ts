/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Organization.serviceService } from './organization.service';

describe('Service: Organization.service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Organization.serviceService]
    });
  });

  it('should ...', inject([Organization.serviceService], (service: Organization.serviceService) => {
    expect(service).toBeTruthy();
  }));
});
