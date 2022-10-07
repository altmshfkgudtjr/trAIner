import { emailChecker } from '../validation';

describe('[Utils] 유효성', () => {
  it('이메일 유효성을 잘 검사하나요?', () => {
    const correctValue = emailChecker('contact@seoulpi.co.kr');
    const wrongValue1 = emailChecker('contact@seoulpi');
    const wrongValue2 = emailChecker('contact@seoulpi.c');
    const wrongValue3 = emailChecker('contact');
    const wrongValue4 = emailChecker('contact@@seoulpi.co.kr');
    const wrongValue5 = emailChecker('<contact>@@seoulpi.co.kr');

    expect(correctValue).toBeTruthy();
    expect(wrongValue1).toBeFalsy();
    expect(wrongValue2).toBeFalsy();
    expect(wrongValue3).toBeFalsy();
    expect(wrongValue4).toBeFalsy();
    expect(wrongValue5).toBeFalsy();
  });
});
