export default function () {
  let olog = console.log

  let pre = document.body.appendChild(document.createElement('pre'))

  console.log = function (line) {
    if (typeof line === 'object') {
      line = JSON.stringify(line)
    }
    olog.apply(console, arguments)
    pre.innerHTML += line + '\n'
  }
}



