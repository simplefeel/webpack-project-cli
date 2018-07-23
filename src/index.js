import { observer } from './util/observer'
import { Watcher } from './util/watcher'
import { HashHistory } from './history/hash'
import { HTML5History } from './history/html5'
class Router {
  constructor(options) {
    this.routes = options.routes
    this.mode = options.mode || 'hash'
    this.base = options.base
    this.container = options.id
    this.history =
      this.mode === 'history' ? new HTML5History(this) : new HashHistory(this)
    Object.defineProperty(this, 'route', {
      get: () => {
        return this.history.current
      }
    })
    this.init()
  }
  push(location) {
    this.history.push(location)
  }
  render() {
    let i
    if ((i = this.history.current) && (i = i.route) && (i = i.component)) {
      document.getElementById(this.container).innerHTML = i
    }
  }
  init() {
    const history = this.history
    console.log(this.history.current)
    observer.call(this, this.history.current)
    new Watcher(this.history.current, 'route', this.render.bind(this))
    history.transitionTo(history.getCurrentLocation())
  }
}
window.Router = Router
