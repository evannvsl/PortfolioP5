import useCursor from '../../hooks/useCursor'

export default function Cursor() {
  const { dotRef, ringRef } = useCursor()
  return (
    <>
      <div id="cursor" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  )
}
