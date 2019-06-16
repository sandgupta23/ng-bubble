import {ComponentFixture, fakeAsync, flush, TestBed} from '@angular/core/testing';

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
import {PageSpec} from '../testing-utils1/page.spec';
import {checkExistenceOnClick} from '../testing-utils1/utility.spec';
import {EDataCy} from '../data-cy';
import {configureEditorWrapper} from './editor-wrapper-config.spec';

fdescribe('EditorWrapperComponent functional', () => {
  // let component: EditorWrapperComponent;
  let fixture: ComponentFixture<EditorWrapperComponent>;
  let page;
  configureEditorWrapper();
  // const oldResetTestingModule = TestBed.resetTestingModule;
  //
  beforeEach(() => {
    fixture = TestBed.createComponent(EditorWrapperComponent);
    page = new PageSpec(fixture);
    fixture.detectChanges();
  });

  afterEach(fakeAsync(() => {
    if (fixture) {
      fixture.destroy();
    }
    flush();
  }));

  it('should minimize editor when minimise button is clicked', fakeAsync(() => {
    fixture.componentInstance.minimize = false;
    const source = EDataCy.header_toggle_minimize;
    const target = EDataCy.app_minimize;
    checkExistenceOnClick(fixture, page, source, target, {shouldExist: true});
  }));


  it('should reset window to default when minimize icon is clicked', fakeAsync(() => {
    fixture.componentInstance.minimize = true;
    const source = EDataCy.app_minimize;
    const target = EDataCy.editor_wrapper;
    checkExistenceOnClick(fixture, page, source, target, {shouldExist: true});
  }));

  // it('should show search panel when search icon (sidebar) is clicked', fakeAsync(() => {
  //   fixture.componentInstance.status = {connection: true};
  //   const source = EDataCy.sidebar_search;
  //   const target = EDataCy.search_panel;
  //   checkExistenceOnClick(fixture, page, source, target, {shouldExist: true});
  // }));

  it('should hide search panel when outside is clicked', fakeAsync(() => {
    fixture.componentInstance.showSearchPanel = true;
    fixture.componentInstance.minimize = false; /*if uncommented test fails...*/
    fixture.detectChanges();
    const source = EDataCy.editor_wrapper_header;
    const target = EDataCy.search_panel;
    checkExistenceOnClick(fixture, page, source, target, {attribute: 'hidden'});
  }));

  afterAll((
    () => {
      // TestBed.resetTestingModule = oldResetTestingModule;
      // TestBed.resetTestingModule();
    }
  ));
});
