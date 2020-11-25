import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBreadcrumbsComponent } from './header-breadcrumbs.component';

describe('HeaderBreadcrumbsComponent', () => {
  let component: HeaderBreadcrumbsComponent;
  let fixture: ComponentFixture<HeaderBreadcrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderBreadcrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
