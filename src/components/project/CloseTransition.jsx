export default function CloseTransition() {
  return (
    <div id="close-transition" aria-hidden="true">
      <div className="ct-speedlines" aria-hidden="true" />

      <div className="ct-shards" aria-hidden="true">
        <span className="ct-shard s1" />
        <span className="ct-shard s2" />
        <span className="ct-shard s3" />
        <span className="ct-shard s4" />
      </div>

      <div className="ct-slash ct-slash-1" aria-hidden="true" />
      <div className="ct-slash ct-slash-2" aria-hidden="true" />
      <div className="ct-panel-left" aria-hidden="true" />
      <div className="ct-panel-right" aria-hidden="true" />
      <div className="ct-panel-accent-left" aria-hidden="true" />
      <div className="ct-panel-accent-right" aria-hidden="true" />

      <div className="ct-stripe" aria-hidden="true" />
      <div className="ct-chromatic" aria-hidden="true" />

      <div className="ct-text-wrap" aria-hidden="true">
        <div className="ct-badge-kicker">STATUS // MISSION CLEARED</div>
        <h2 className="ct-text-main" data-text="MISSION COMPLETE">MISSION COMPLETE</h2>
        <div className="ct-text-sub-box">
          <span className="ct-text-sub">◆ RETURNING TO BASE PORTFOLIO ◆</span>
        </div>
      </div>

      <div className="ct-stamp-ring" aria-hidden="true" />
      <div className="ct-impact-stamp" aria-hidden="true">CLEAR!</div>

      <div className="ct-flash" aria-hidden="true" />
    </div>
  )
}
