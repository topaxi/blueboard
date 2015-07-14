import Ember from 'ember'

const { computed } = Ember

export default Ember.Component.extend({
  tagName: 'tr',

  hasPlatforms: computed('parentView.hasPlatforms', function() {
    return this.get('parentView.hasPlatforms')
  })
})
