const expect = require('expect');
const {generateMessage} = require('./message');



describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'Admin';
    let text = 'Hello'
    const res = generateMessage(from, text);
    // expect(res.from).toEqual(from);
    // expect(res.text).toEqual(text);
    expect(res).toInclude({from, text}); // will not work in modern versions of expect
    expect(res.createdAt).toBeA('number');
  });
});
