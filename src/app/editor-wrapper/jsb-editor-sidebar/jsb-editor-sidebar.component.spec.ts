import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppEditorSidebarComponent } from './jsb-editor-sidebar.component';

describe('AppEditorSidebarComponent', () => {
  let component: AppEditorSidebarComponent;
  let fixture: ComponentFixture<AppEditorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppEditorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppEditorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
