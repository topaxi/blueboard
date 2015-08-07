import Ember from 'ember'
import ajax  from 'ic-ajax'

import LoadingIndicator from 'blueboard/mixins/loading-indicator'

const { computed, inject } = Ember

export default Ember.Route.extend(LoadingIndicator, {
  opendata: inject.service(),

  connections: [
    { from: 'Bern',          to: 'Interlaken West' },
    { from: 'Nydegg',        to: 'Bern' },
    { from: 'Bümpliz, Post', to: 'Bern' },
  ],

  url: computed('host', 'namespace', function() {
    return `${this.host}/${this.namespace}/stationboard`
  }),

  model() {
    return this.connections
  },

  actions: {
    refresh() {
      this.refresh()
    }
  }
})
