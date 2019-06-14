import {flush, flushMicrotasks} from '@angular/core/testing';

export function checkExistenceOnClick(fixture, page, source, target, visiblility: { shouldExist?: boolean, attribute?: string }) {
  fixture.detectChanges();
  const attr = source;
  const el = page.queryAllBody(`[data-cy="${attr}"]`);
  el.click();
  flushMicrotasks();
  fixture.detectChanges();
  const attr1 = target;
  const shouldExist = visiblility.shouldExist;
  const attribute = visiblility.attribute;

  if (shouldExist === true) {
    expect(page.queryAllBody(`[data-cy="${attr1}"]`)).toBeTruthy();
  } else if (shouldExist === false) {
    console.log(page.queryAllBody(`[data-cy="${attr1}"]`));
    expect(page.queryAllBody(`[data-cy="${attr1}"]`)).toBeFalsy();
  } else if (attribute) {
    page.queryAllBody(`[data-cy="${attr}"]`).hasAttribute('hidden');
  }
  flush();
}


export function checkSpyOnClick(fixture, page, source, methodName: string, arg?) {
  const {method, immediateParent} = getKeyAndImmediateParentByPath(fixture.componentInstance, methodName);
  console.log(method, immediateParent);
  spyOn(immediateParent, method.name);
  const attr = source;
  const el = page.queryAllBody(`[data-cy="${attr}"]`);
  el.click();
  flushMicrotasks();
  fixture.detectChanges();
  expect(immediateParent[method.name]).toHaveBeenCalled();
  flush();
}

function getKeyAndImmediateParentByPath(obj, path: string) {
  let method = path;
  let immediateParent;
  if (path.includes('.')) {
    const length = method.split('.').length;
    path.split('.').forEach((key, index) => {
      obj = obj[key];
      if (index === length - 2) {
        immediateParent = obj;
      }
    });
    method = obj;
    return {
      method,
      immediateParent
    };
  } else {
    return {
      method: obj[path],
      immediateParent: obj
    };
  }
}
