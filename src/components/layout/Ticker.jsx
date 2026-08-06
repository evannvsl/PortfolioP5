import { tickerItems } from '../../data/ticker'

export default function Ticker({ reverse = false }) {
  const track = [0, 1].map(rep =>
    tickerItems.map((item, i) => (
      <div className={`p5-ticker-item type-${item.type}`} key={`${rep}-${i}`}>
        <div className="p5-ticker-item-inner">
          {item.icon && <span className="ticker-item-icon">{item.icon}</span>}
          <span className="ticker-item-text">{item.text}</span>
        </div>
      </div>
    ))
  )

  return (
    <div className={`p5-ticker${reverse ? ' p5-ticker-reverse' : ''}`} aria-hidden="true">
      <div className="p5-ticker-track">{track}</div>
    </div>
  )
}