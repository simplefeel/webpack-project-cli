import { Dep } from './dep'
class Observer {
  constructor(value) {
    this.walk(value)
  }
  walk(obj) {
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0) {
        this.walk(obj[key])
      }
      defineReactive(obj, key, obj[key])
    })
  }
}

function defineReactive(obj, key, value) {
  let dep = new Dep()
  Object.defineProperty(obj, key, {
    get: () => {
      if (Dep.target) {
        dep.add()
      }
      return value
    },
    set: newValue => {
      value = newValue
      dep.notify()
    }
  })
}

export function observer(value) {
  return new Observer(value)
}
