import Ember from 'ember'

const { computed } = Ember

export default Ember.Component.extend({
  hasPlatforms: computed('stationboard.@each.stop.platform', function() {
    return this.get('stationboard').some(i => i.stop.platform)
  })
})
