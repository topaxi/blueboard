import Ember from 'ember'
import ajax from 'ic-ajax'
import LoadingIndicator from 'blueboard/mixins/loading-indicator'

const { $, computed } = Ember

export default Ember.Route.extend(LoadingIndicator, {
  host: 'http://transport.opendata.ch',
  namespace: 'v1',
  stations: [ 'Nydegg', 'Bern', 'Bümpliz, Post', 'Interlaken West' ],
  limit: 30,

  init(...args) {
    this._super(...args)

    setInterval(() => this.refresh(), 1000 * 60)
  },

  url: computed('host', 'namespace', function() {
    return `${this.host}/${this.namespace}/stationboard`
  }),

  model() {
    return Ember.RSVP.all(this.stations.map(station =>
      ajax(this.get('url'), { data: { station, limit: this.limit } })
        .catch(err => ({
            error:   err.errorThrown,
            station: { name: station },
            stationboard: []
          })
        )
        .finally(() => this.nprogress.inc())
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
