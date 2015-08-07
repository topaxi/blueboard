import Ember from 'ember'

const { computed, inject } = Ember

export default Ember.Component.extend({
  opendata: inject.service(),
  tagName: 'table',

  limit: 6,
  from: null,
  to: null,
  error: null,
  connections: null,

  init(...args) {
    this._super(...args)
    this.set('fromto', [])
    this.set('tofrom', [])
    this.send('fetchData')

    setInterval(() => this.send('fetchData'), 1000 * 60)
  },

  connections: computed('fromto', 'tofrom', function() {
    let connections = this.get('fromto').concat(this.get('tofrom'))

    connections.sort((a, b) =>
      a.from.departureTimestamp - b.from.departureTimestamp
    )

    return connections
  }),

  hasPlatforms: computed('connections.@each.from.prognosis.platform', function() {
    return this.get('connections').some(i => i.from.prognosis.platform)
  }),

  hasTransfers: computed('connections.@each.transfers', function() {
    return this.get('connections').some(i => i.transfers)
  }),

  actions: {
    fetchData() {
      let { from, to, limit } = this

      let fromto = this.get('opendata').getConnections({
        from, to, limit
      })
      .then(data => {
        this.set('fromto', data.connections)
      })

      let tofrom = this.get('opendata').getConnections({
        to:   from,
        from: to,
        limit
      })
      .then(data => {
        this.set('tofrom', data.connections)
      })

      Ember.RSVP.all([ fromto, tofrom ])
        .catch(err => this.set('error', err.errorThrown))
    }
  }
})
