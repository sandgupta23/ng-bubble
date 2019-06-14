import {ComponentFixture} from '@angular/core/testing';

export class PageSpec <C> {
  // getter properties wait to query the DOM until called.
  get buttons()     { return this.queryAll<HTMLButtonElement>('button'); }
  get saveBtn()     { return this.buttons[0]; }
  get cancelBtn()   { return this.buttons[1]; }
  get nameDisplay() { return this.query<HTMLElement>('span'); }
  get nameInput()   { return this.query<HTMLInputElement>('input'); }

  gotoListSpy: jasmine.Spy;
  navigateSpy:  jasmine.Spy;

  constructor(private fixture: ComponentFixture<C>) {
    // get the navigate spy from the injected router spy object
    // const routerSpy = <any> fixture.debugElement.injector.get(Router);
    // this.navigateSpy = routerSpy.navigate;

    // spy on component's `gotoList()` method
    const component = fixture.componentInstance;
    // this.gotoListSpy = spyOn(component, 'gotoList').and.callThrough();
  }

  //// query helpers ////

  queryAllBody<T>(selector: string): Element {
    return (document.querySelector('[id^="root"]').shadowRoot.querySelectorAll(selector))[0];
  }
  queryBody<T>(selector: string): Element {
    return document.querySelector('[id^="root"]').shadowRoot.querySelector(selector);
  }
  query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }

  getTextContent(fixture) {
    return this.fixture.debugElement.nativeElement.textContent;
  }

  getElementByDataAttr(attr) {
    return this.fixture.debugElement.nativeElement.querySelector(`[data-cy="${attr}"]`);
  }
}
