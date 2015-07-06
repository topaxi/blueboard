export default function() {
  this.transition(
    this.childOf('td'),
    this.use('toUp', { duration: 1000 })
  )
}
