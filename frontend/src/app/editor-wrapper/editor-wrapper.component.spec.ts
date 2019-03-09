import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorWrapperComponent } from './editor-wrapper.component';

describe('EditorWrapperComponent', () => {
  let component: EditorWrapperComponent;
  let fixture: ComponentFixture<EditorWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
