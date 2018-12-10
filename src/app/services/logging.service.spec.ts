import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoggingService } from './logging.service';

describe('LoggingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [LoggingService]
    });
  });

  it('should be created', inject([LoggingService], (service: LoggingService) => {
    expect(service).toBeTruthy();
  }));
});
