import {async, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';

//
export function configure(modules: { imports: any[], declarations: any[], providers?: any[] }) {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      ...modules,
      schemas: [NO_ERRORS_SCHEMA],
      // imports:[MatIconModule,RouterModule]
    });

  }));
}

export function getTextContent(fixture) {
  return fixture.debugElement.nativeElement.textContent;
}

export function getElementByDataAttr(fixture, attr) {
  return fixture.debugElement.nativeElement.querySelector(`[data-cy="${attr}"]`);
}


// function createHostComponent(template?: string): ComponentFixture<HostComponent> {
//   if (template) TestBed.overrideComponent(HostComponent, {set: {template: template}});
//   const fixture = TestBed.createComponent(HostComponent);
//   fixture.detectChanges();
//   return fixture as ComponentFixture<HostComponent>;
// }
