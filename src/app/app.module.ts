import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component';
import { AppEditorComponent } from './editor-wrapper/app-editor/app-editor.component';
import { AppEditorSidebarComponent } from './editor-wrapper/app-editor-sidebar/app-editor-sidebar.component';
import { EditorHeaderComponent } from './editor-wrapper/editor-header/editor-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {createCustomElement} from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    EditorWrapperComponent,
    AppEditorComponent,
    AppEditorSidebarComponent,
    EditorHeaderComponent,

  ],
  entryComponents:[
    EditorWrapperComponent,
    AppEditorComponent,
    AppEditorSidebarComponent,
    EditorHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector){}
  ngDoBootstrap() {
    const el = createCustomElement(EditorWrapperComponent, { injector: this.injector });
    customElements.define('user-poll', el);
  }

}
