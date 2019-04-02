import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';
import { JsbEditorComponent } from './editor-wrapper/jsb-editor/jsb-editor.component';
import { EditorHeaderComponent } from './editor-wrapper/editor-header/editor-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {createCustomElement} from '@angular/elements';
import { JsonParsePipe } from './json-parse.pipe';
import { GetObjectKeyPipe } from './get-object-key.pipe';
import { FileSearchPanelComponent } from './editor-wrapper/file-search-panel/file-search-panel.component';
import { ImageByExtensionPipe } from './editor-wrapper/file-search-panel/image-by-extension.pipe';
import {ClickOutsideModule} from 'ng-click-outside';
import { TestComponent } from './test/test.component';
import { MenuComponent } from './editor-wrapper/menu/menu.component';
import {AppComponent} from "./app.component";
import {JsbEditorSidebarComponent} from "./editor-wrapper/jsb-editor-sidebar/jsb-editor-sidebar.component";
import { ObjectTrayComponent } from './editor-wrapper/object-tray/object-tray.component';
import { ObjectKeyComponent } from './editor-wrapper/object-tray/object-key/object-key.component';
import { ObjectDetailComponent } from './editor-wrapper/object-tray/object-detail/object-detail.component';
import { ObjectByPathPipe } from './object-by-path.pipe';
import { JsConsoleComponent } from './editor-wrapper/js-console/js-console.component';
import { DataTypePipe } from './data-type.pipe';

@NgModule({
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
  ],
  entryComponents:[
    EditorWrapperComponent,
    JsbEditorComponent,
    JsbEditorSidebarComponent,
    EditorHeaderComponent,
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector){
      const el = createCustomElement(EditorWrapperComponent, { injector: this.injector });
      customElements.define('js-bubble', el);
  }
  ngDoBootstrap() {
  //   const el = createCustomElement(EditorWrapperComponent, { injector: this.injector });
  //   customElements.define('js-bubble', el);
  //   const el = createCustomElement(EditorWrapperComponent, { injector: this.injector });
  //   customElements.define('js-bubble', el);
  }

}
//