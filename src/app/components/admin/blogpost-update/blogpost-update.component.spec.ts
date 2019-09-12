import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogpostUpdateComponent } from './blogpost-update.component';

describe('BlogpostUpdateComponent', () => {
  let component: BlogpostUpdateComponent;
  let fixture: ComponentFixture<BlogpostUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogpostUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogpostUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
