/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */

/**
 * vscode-dummy-holder
 * by z0gSh1u @ 2020-05
 * https://github.com/z0gSh1u/vscode-dummy-holder
 */

import CopyPaste = require('copy-paste')

// Image generation
const Colors: { [key: string]: string } = {
  black: '000',
  red: 'f00',
  green: '0f0',
  blue: '00f',
  yellow: 'ff0',
  cyan: '0ff',
  purple: 'f0f',
  white: 'fff',
  grey: 'ccc',
  gray: 'ccc',
}
export function generateImage(command: string) {
  let h, w, color, text: string, textColor, format, https
  function getAndErase(pattern: RegExp) {
    // pattern should not have global flag
    let match = pattern.exec(command)
    command = command.replace(pattern, '')
    return match ? match[0] : null
  }
  // parse h and w
  const size = getAndErase(/\d+x\d+/) || getAndErase(/\d+/)
  if (!size) throw new Error('Size is a must but not found.')
  ;[w, h] = [...[...size.split('x'), ...size.split('x')].slice(0, 2).map(x => parseInt(x))]
  // parse color
  const COLOR_HEX_PATTERN = /#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})\s/
  const COLOR_WORD_PATTERN = new RegExp(`(${Object.keys(Colors).join('|')})`)
  color = getAndErase(COLOR_HEX_PATTERN) || getAndErase(COLOR_WORD_PATTERN)
  textColor = getAndErase(COLOR_HEX_PATTERN) || getAndErase(COLOR_WORD_PATTERN)
  function colorHelper(color: string | undefined) {
    if (color) {
      color = color.toLowerCase().trim()
      if (color in Colors) color = Colors[color]
      else if (color[0] === '#') color = color.substring(1)
    } else color = Colors.gray
    return color
  }
  ;[color, textColor] = [color, textColor].map(colorHelper)
  // parse format
  const FORMAT_PATTERN = /(jpg|jpeg|png|gif)/
  format = getAndErase(FORMAT_PATTERN) || 'png'
  // parse https
  const HTTPS_PATTERN = /https?/
  https = getAndErase(HTTPS_PATTERN) || 'https'
  // parse text
  text = command.trim() || ''
  text = encodeURIComponent(text)
  // generate image
  let url = `${https}://via.placeholder.com/${w}x${h}/${color}.${format}`
  !!text && (url += `/${textColor}?text=${text}`)
  return url
}

// Paragraph generation
const Paragraphs = [
  'the quick brown fox jumps over the lazy dog',
  `Listen, Rose. You're going to get out of here. `,
  `You're going to go on.`,
  `You're going to make lots of babies, `,
  `and you're going to watch them grow.`,
  `You' re going to die and old, an old lady in her warm bed, `,
  `not here, not this night, not like this.`,
  `We, therefore, the Representatives of the United States of America, `,
  `appealing to the Supreme Judge of the world for the rectitude...`,
]
export function generateParagraph(command: string) {
  const lengthString = /\d+/.exec(command)
  if (!lengthString) throw new Error('Length is a must but not found.')
  const length = parseInt(lengthString[0].trim())
  const multiline = !/(no|false|n|f)/.exec(command)
  let p = ``
  while (p.length < length) {
    p += Paragraphs[Math.floor(Math.random() * Paragraphs.length)] + ' '
    if (multiline && Math.random() < 0.5) p += '\n'
  }
  return p
}

// Copy Function
export function copy(content: string) {
  CopyPaste.copy(content, err => {
    throw err
  })
}
