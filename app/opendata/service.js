import Ember from 'ember'
import ajax  from 'ic-ajax'

const { computed } = Ember

export default Ember.Service.extend({
  host: 'https://transport.opendata.ch',
  namespace: 'v1',

  url: computed('host', 'namespace', function() {
    return `${this.host}/${this.namespace}`
  }),

  getStationboard(data) {
    return ajax(`${this.get('url')}/stationboard`, { data })
  },

  getConnections(data) {
    return ajax(`${this.get('url')}/connections`, { data })
  }
})
