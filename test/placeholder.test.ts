import { generateImage, generateParagraph } from '../src/placeholder'
import assert = require('assert')

describe('Generate Image', () => {
  it('various parameters', () => {
    assert.equal(
      generateImage('300x400 #ccc blue hello, world https'),
      'https://via.placeholder.com/300x400/ccc.png/00f?text=hello%2C%20world'
    )
    assert.equal(
      generateImage('200 green #3f3f3f http'),
      'http://via.placeholder.com/200x200/3f3f3f.png'
    )
  })
})

describe('Generate Paragraph', () => {
  it('long enough', () => {
    assert.ok(generateParagraph('300').length >= 300)
  })
})
