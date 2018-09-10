const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');



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

describe('generateLocationMessage', () =>{
  it('should generate the correct location object', () => {
    const lat = 12345;
    const long = 54321;
    const from = 'Admin';
    const url = `https://www.google.com/maps?q=${lat},${long}`;
    const res = generateLocationMessage(from, lat, long);

    expect(typeof res.createdAt).toBe('number')
    expect(res).toInclude({from, url});
  });
});
