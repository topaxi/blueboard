import Ember from 'ember'
import ajax  from 'ic-ajax'

import LoadingIndicator from 'blueboard/mixins/loading-indicator'

const { inject } = Ember

export default Ember.Route.extend(LoadingIndicator, {
  opendata: inject.service(),

  queryParams: {
    'from':          { refreshModel: false, replace: true },
    'to':            { refreshModel: false, replace: true },
    'via':           { refreshModel: false, replace: true },
    'date':          { refreshModel: false, replace: true },
    'time':          { refreshModel: false, replace: true },
    'isArrivalTime': { refreshModel: false, replace: true }
  },

  model(params) {
    if (!params.from || !params.to) {
      return {}
    }

    return this.get('opendata').getConnections(params)
  },

  actions: {
    search() {
      this.refresh()
    }
  }
})
