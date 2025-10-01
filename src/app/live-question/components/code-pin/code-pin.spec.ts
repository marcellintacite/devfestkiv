import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePin } from './code-pin';

describe('CodePin', () => {
  let component: CodePin;
  let fixture: ComponentFixture<CodePin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodePin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodePin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
