import React from 'react'

function renderWord(content, i) {
  return (
    <span className="word" key={`w-${i}`}>
      <span className="word-inner" style={{ transitionDelay: `${i * 50}ms` }}>{content}</span>
    </span>
  )
}

export default function SplitWords({ children }) {
  const out = []
  let idx = 0

  React.Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      String(child).split(' ').forEach(part => {
        if (part !== '') out.push(renderWord(part, idx++))
      })
    } else if (child != null && child.type === 'br') {
      out.push(child)
    } else if (child != null) {
      out.push(
        <span className="word" key={`w-${idx}`}>
          <span className="word-inner" style={{ transitionDelay: `${idx * 50}ms` }}>{child}</span>
        </span>
      )
      idx++
    }
  })

  return <>{out}</>
}
