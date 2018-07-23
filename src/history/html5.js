import { Base, match } from './base'

export class HTML5History extends Base {
  constructor(router) {
    super(router)
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getLocation())
    })
  }
  push(location) {
    const targetRoute = match(location, this.router.routes)
    this.transitionTo(targetRoute, () => {
      changeUrl(this.router.base, this.current.fullPath)
    })
  }
  getCurrentLocation() {
    return getLocation(this.router.base)
  }
}

function getLocation(base = '') {
  let path = window.location.pathname
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length)
  }
  return (path || '/') + window.location.search
}

function changeUrl(base, path, replace) {
  if (replace) {
    window.history.replaceState({}, '', (base + path).replace(/\/\//g, '/'))
  } else {
    window.history.pushState({}, '', (base + path).replace(/\/\//g, '/'))
  }
}
