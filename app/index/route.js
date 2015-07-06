import Ember from 'ember'

const { $ } = Ember

export default Ember.Route.extend({
  host: 'http://transport.opendata.ch',
  namespace: 'v1',

  init(...args) {
    this._super(...args)

    setInterval(() => this.refresh(), 1000 * 60)
  },

  model() {
    let limit    = 30
    let stations = [ 'Nydegg', 'Bern', 'Bümpliz, Post', 'Interlaken West' ]

    return Ember.RSVP.all(stations.map(station =>
      $.getJSON(`${this.host}/${this.namespace}/stationboard`, { station, limit })
    ))
  },

  afterModel(model) {
    let now = Date.now()

    for (let res of model) {
      res.stationboard = res.stationboard.filter(i => new Date(i.stop.departure) > now)
                                         .slice(0, 10)
    }
  },

  actions: {
    refresh() {
      this.refresh()
    }
  }
})
