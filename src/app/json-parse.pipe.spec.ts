import { JsonParsePipe } from './json-parse.pipe';

describe('JsonParsePipe', () => {
  it('create an instance', () => {
    const pipe = new JsonParsePipe();
    expect(pipe).toBeTruthy();
  });
});
