import Ember  from 'ember'
import moment from 'moment'

const { computed } = Ember

export default Ember.Component.extend({
  tagName: 'table',
  limit: 10,

  filter: function(board) {
    let { departure, delay } = board.stop

    return moment(departure).add(delay, 'minutes') > Date.now()
  },

  boards: computed('stationboard', function() {
    return this.get('stationboard').filter(this.filter)
                                   .slice(0, this.limit)
  }),

  hasPlatforms: computed('boards.@each.stop.platform', function() {
    return this.get('boards').some(i => i.stop.platform)
  })
})
