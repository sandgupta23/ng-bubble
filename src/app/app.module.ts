import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule} from '@angular/core';

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
  ],
  entryComponents:[
    EditorWrapperComponent,
    JsbEditorComponent,
    JsbEditorSidebarComponent,
    EditorHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  // bootstrap: [AppComponent]
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