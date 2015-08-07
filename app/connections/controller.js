import Ember from 'ember'

export default Ember.Controller.extend({
  queryParams: [ 'from', 'to', 'via', 'date', 'time', 'isArrivalTime' ],

  actions: {
    setFrom(value) {
      this.set('from', value)
    },

    setTo(value) {
      this.set('to', value)
    },

    setArrival(value) {
      this.set('isArrivalTime', value)
    }
  }
})
