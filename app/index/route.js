import Ember  from 'ember'
import moment from 'moment'
import ajax   from 'ic-ajax'

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
    let now    = Date.now()
    let filter = item => moment(item.stop.departure).add(item.stop.delay, 'minutes') > now

    for (let res of model) {
      res.stationboard = res.stationboard.filter(filter)
                                         .slice(0, 10)
    }
  },

  actions: {
    refresh() {
      this.refresh()
    }
  }
})
