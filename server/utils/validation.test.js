const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('Should reject non-string values', () => {
    const roomName = 1234;
    const res = isRealString(roomName);
    expect(res).toBe(false);
  });
  it('Should reject string with only spaces', () => {
    const roomName = '       ';
    const res = isRealString(roomName);
    expect(res).toBe(false);
  });
  it('Should allow string with non-space characters', () => {
    const roomName = 'something';
    const res = isRealString(roomName);
    expect(res).toBe(true);

  });
});
