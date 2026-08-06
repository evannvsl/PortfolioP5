import { chatData } from '../../data/chat'
import useChatReveal from '../../hooks/useChatReveal'
import SplitWords from '../common/SplitWords'

export default function ChatSection() {
  useChatReveal()

  return (
    <section id="chat">
      <div className="section-tag reveal"><span>☣</span> QnA</div>
      <h2 className="section-heading reveal split">
        <SplitWords>numero</SplitWords>
        <br />
        <SplitWords>singko.</SplitWords>
      </h2>

      <div className="chat-arena reveal">
        {chatData.map((c, i) => (
          <div className={`chat-bubble ${c.side}`} key={i}>
            <img src={c.avatar} alt={c.name} className="bubble-avatar" />
            <div className="bubble-body">
              <span className="bubble-name">{c.name}</span>
              <p>{c.text.split('\n').map((line, j) => (
                <span key={j}>{j > 0 && <><br /></>}{line}</span>
              ))}</p>
            </div>
          </div>
        ))}

        <div className="chat-input-bar">
          <span className="input-prefix">◆ ENTER MESSAGE...</span>
          <button className="input-send" type="button">SEND</button>
        </div>
      </div>
    </section>
  )
}