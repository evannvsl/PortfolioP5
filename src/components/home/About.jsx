import SplitWords from '../common/SplitWords'

export default function About() {
  return (
    <section id="about">
      <div className="section-tag reveal"><span>☣</span> ABOUT</div>
      <div className="about-grid">
        <div className="about-visual reveal reveal-left">
          <div className="about-frame">
            <img src="/assets/img/shinji.jpeg" alt="Persona 5 mood" className="about-img" />
            <div className="about-frame-border" />
            <div className="about-frame-corner tl" />
            <div className="about-frame-corner tr" />
            <div className="about-frame-corner bl" />
            <div className="about-frame-corner br" />
          </div>
        </div>
        <div className="about-content">
          <h2 className="about-statement reveal split">
            <SplitWords>
              &quot;Don&rsquo;t let your dreams be dreams! Yesterday you said tomorrow, So
              <span className="cut-red"> Just do it!&quot;</span>
            </SplitWords>
          </h2>
          <div className="about-copy reveal reveal-right">
            <p>Hello world! my real name is <strong>Evan Galang Wiryanto</strong>, Computer Science student who builds websites, apps, arts, etc. I love combining technical precision with visual touches that have character.</p>
            <p>Every project I work on is treated like a collection and museum: there's a concept, there's execution, and there are details that are maintained until the end.</p>
          </div>
        </div>
      </div>
    </section>
  )
}