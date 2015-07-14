/* globals NProgress */
import Ember from 'ember'

NProgress.configure({ showSpinner: false })

export default Ember.Mixin.create({
  nprogress: NProgress,
  actions: {
    loading() {
      this.nprogress.start()
      this.router.one('didTransition', () => this.nprogress.done())
      return true
    }
  , error() {
      this.nprogress.done()
      return true
    }
  }
})
