import {configure} from '../testing-utils1/configure.spec';
import {AppComponent} from '../app.component';
import {EditorWrapperComponent} from './editor-wrapper.component';
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

export function configureEditorWrapper() {
  configure({
    declarations: [
      AppComponent,
      EditorWrapperComponent,
      JsbEditorComponent,
      JsbEditorSidebarComponent,
      EditorHeaderComponent,
      JsonParsePipe,
      GetObjectKeyPipe,
      FileSearchPanelComponent,
      ImageByExtensionPipe,
      TestComponent,
      MenuComponent,
      ObjectTrayComponent,
      ObjectKeyComponent,
      ObjectDetailComponent,
      ObjectByPathPipe,
      JsConsoleComponent,
      DataTypePipe,
      ObjectByProbablePathPipe,
      SortObjectPipe,
      ChangedPrefixComponent,
      MinimizePlaceholderComponent,
      JsbEditorSidebarComponent,
      EditorHeaderComponent,
    ],
    imports: [
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ClickOutsideModule,
      ResizableModule,
      NgxJsonViewerModule,
      HttpClientModule
    ],
  });
}