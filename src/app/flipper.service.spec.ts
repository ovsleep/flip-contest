/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlipperService } from './flipper.service';

describe('FlipperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlipperService]
    });
  });

  it('should ...', inject([FlipperService], (service: FlipperService) => {
    expect(service).toBeTruthy();
  }));
});
