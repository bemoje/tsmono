import fs from 'fs'
import { _HtmlDocument } from './helpers/_HtmlDocument'
import { attr, comment, el, tableFrom } from './html'

const doc = _HtmlDocument.simple({
  title: 'index',
  head: [el.style('.row { margin-top: 10px } .col { margin: 20px }')],
  body: [
    comment('First row'),
    el.div(
      attr.class('row'),
      el.div(
        attr.class('col'),
        el.h3('Table'),
        tableFrom([
          ['A', 'B', 'C'],
          ['Abe', 'Ben', 'Citron'],
          ['Ananas', 'Bongo', 'Cirkus'],
        ]),
        el.div(attr.class('col'), el.h3('Text'), el.p('This is a paragraph.')),
      ),
    ),
    comment('Second row'),
    el.div(
      attr.class('row'),
      el.div(
        attr.class('col'),
        el.h3('List'),
        el.ul(['one', 'two', 'three', 'four'].map((item) => el.li(attr.contenteditable(true), item))),
      ),
      el.div(
        attr.class('col'),
        el.h3('Button'),
        el.button([attr.class('btn btn-primary'), attr.onclick('doit()')], 'Click me!'),
      ),
    ),
  ],
  scripts: [
    el.script(`function doit() { console.log('did it'); }`),
    //
  ],
})

console.dir(doc, { depth: null })
console.log(doc.toString())
fs.writeFileSync(__filename + '.html', doc.toString())
