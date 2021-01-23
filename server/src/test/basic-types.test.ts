import { compile } from '../utils';

describe('테스트 코드가 정상적으로 동작하는지 테스트', () => {
  test('타입 체크', () => {
    let isDone: boolean = false;
    expect(typeof isDone).toBe('boolean');
  });

  test('타입 체크 및 오류 위치 검증', () => {
    let isDone: boolean = false;
    expect(typeof isDone).toBe('boolean');

    const diagnostics = compile(`
      let isDone: boolean = 1
    `);

    console.log(diagnostics);
  });
});
