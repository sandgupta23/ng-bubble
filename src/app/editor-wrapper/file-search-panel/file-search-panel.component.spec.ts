import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSearchPanelComponent } from './file-search-panel.component';

describe('FileSearchPanelComponent', () => {
  let component: FileSearchPanelComponent;
  let fixture: ComponentFixture<FileSearchPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileSearchPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
