import { TestBed, inject } from '@angular/core/testing';
 import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from './project.service';
//import { HttpClient } from '@angular/common/http';
describe('Project.Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProjectService]
    });
  });

  it('should be created', inject([ProjectService], (service: ProjectService) => {
    expect(service).toBeTruthy();
  }));
});
