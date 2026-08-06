export default function BattleTransition() {
  return (
    <div id="battle-transition" aria-hidden="true" aria-live="polite">
      <div className="bt-speedlines" aria-hidden="true" />

      <div className="bt-shards" aria-hidden="true">
        <span className="bt-shard s1" />
        <span className="bt-shard s2" />
        <span className="bt-shard s3" />
        <span className="bt-shard s4" />
      </div>

      <div className="bt-slash bt-slash-1" aria-hidden="true" />
      <div className="bt-slash bt-slash-2" aria-hidden="true" />

      <div className="bt-panel-left" aria-hidden="true" />
      <div className="bt-panel-right" aria-hidden="true" />
      <div className="bt-panel-accent-left" aria-hidden="true" />
      <div className="bt-panel-accent-right" aria-hidden="true" />

      <div className="bt-halftone" aria-hidden="true" />
      <div className="bt-chromatic" aria-hidden="true" />

      <div className="bt-text-wrap" aria-hidden="true">
        <div className="bt-badge-kicker">SHOWTIME // SINKRONISASI PORTFOLIO</div>
        <h2 className="bt-text-main" data-text="TAKE YOUR HEART">TAKE YOUR HEART</h2>
        <div className="bt-text-sub-box">
          <span className="bt-text-sub">◆ PHANTOM THIEVES ARCHIVE SINKRON ◆</span>
        </div>
      </div>

      <div className="bt-impact-stamp" aria-hidden="true">SLAM!</div>

      <div className="bt-flash-red" aria-hidden="true" />
      <div className="bt-flash" aria-hidden="true" />
    </div>
  )
}
