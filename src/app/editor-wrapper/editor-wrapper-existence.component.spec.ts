import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditorWrapperComponent} from './editor-wrapper.component';
import {AppComponent} from '../app.component';
import {JsbEditorComponent} from './jsb-editor/jsb-editor.component';
import {JsbEditorSidebarComponent} from './jsb-editor-sidebar/jsb-editor-sidebar.component';
import {EditorHeaderComponent} from './editor-header/editor-header.component';
import {JsonParsePipe} from '../json-parse.pipe';
import {GetObjectKeyPipe} from '../get-object-key.pipe';
import {FileSearchPanelComponent} from './file-search-panel/file-search-panel.component';
import {ImageByExtensionPipe} from './file-search-panel/image-by-extension.pipe';
import {TestComponent} from '../test/test.component';
import {MenuComponent} from './menu/menu.component';
import {ObjectTrayComponent} from './object-tray/object-tray.component';
import {ObjectKeyComponent} from './object-tray/object-key/object-key.component';
import {ObjectDetailComponent} from './object-tray/object-detail/object-detail.component';
import {ObjectByPathPipe} from '../object-by-path.pipe';
import {JsConsoleComponent} from './js-console/js-console.component';
import {DataTypePipe} from '../data-type.pipe';
import {ObjectByProbablePathPipe} from '../object-by-probable-path.pipe';
import {SortObjectPipe} from '../sort-object.pipe';
import {ChangedPrefixComponent} from '../changed-prefix/changed-prefix.component';
import {MinimizePlaceholderComponent} from './minimize-placeholder/minimize-placeholder.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClickOutsideModule} from 'ng-click-outside';
import {ResizableModule} from 'angular-resizable-element';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {HttpClientModule} from '@angular/common/http';
import {configure} from '../testing-utils1/configure.spec';
import {FakeDataSpec} from '../testing-utils1/fake-data.spec';
import {PageSpec} from '../testing-utils1/page.spec';
import {EDataCy} from '../data-cy';
import {configureEditorWrapper} from './editor-wrapper-config.spec';

fdescribe('EditorWrapperComponent existence', () => {
  // let component: EditorWrapperComponent;
  let fixture: ComponentFixture<EditorWrapperComponent>;
  let page;
  configureEditorWrapper();
  const oldResetTestingModule = TestBed.resetTestingModule;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWrapperComponent);
    page = new PageSpec(fixture);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should display menu when showTooltip is true', (() => {
    fixture.componentInstance.showTooltip = true;
    fixture.componentInstance._coords = FakeDataSpec._coords;
    fixture.detectChanges();
    const attr = EDataCy.menu;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should display minimize when minimize is true', (() => {
    fixture.componentInstance.minimize = true;
    fixture.detectChanges();
    const attr = EDataCy.app_minimize;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should display minimize when minimize is true', (() => {
    fixture.componentInstance.minimize = true;
    fixture.detectChanges();
    const attr = EDataCy.app_minimize;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should display server disconnect banner _status.connection is false', (() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance._status = {connection: false};
    fixture.detectChanges();
    const attr = EDataCy.server_disconnect_banner;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should display editor wrapper header when not minimised', (() => {
    fixture.componentInstance.minimize = false;
    const attr = EDataCy.editor_wrapper_header;
    fixture.detectChanges();
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should display editor sidebar when not minimised', (() => {
    fixture.componentInstance.minimize = false;
    const attr = EDataCy.editor_sidebar;
    fixture.detectChanges();
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should file editor sidebar when not minimised and file data exists', (() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance.fileData = FakeDataSpec.fileData;
    fixture.detectChanges();
    const attr = EDataCy.editor_file;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('should file editor sidebar when not minimised and json viewer exists', (() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance.fileData = FakeDataSpec.codeData;
    fixture.detectChanges();
    const attr = EDataCy.editor_json_viewer;
    expect(page.queryAllBody(`[data-cy="${attr}"]`)).toBeTruthy();
  }));

  it('search panel should be shown by when showSearchPanel is false', (() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance.showSearchPanel = false;
    fixture.detectChanges();
    const attr = EDataCy.search_panel;
    expect((page.queryAllBody(`[data-cy="${attr}"]`).hasAttribute('hidden'))).toEqual(true);
  }));

  it('search panel should be shown by when showSearchPanel is true', (() => {
    fixture.componentInstance.minimize = false;
    fixture.componentInstance.showSearchPanel = true;
    fixture.detectChanges();
    const attr = EDataCy.search_panel;
    expect((page.queryAllBody(`[data-cy="${attr}"]`).hasAttribute('hidden'))).toEqual(false);
  }));


  afterEach((() => {
    fixture.destroy();
    // flush();
  }));

  afterAll((
    () => {
      TestBed.resetTestingModule = oldResetTestingModule;
      TestBed.resetTestingModule();
    }
  ));
});
