import { setTarget, cleanTarget } from './dep'

export class Watcher {
  constructor(vm, expression, callback) {
    this.vm = vm
    this.expression = expression
    this.callbacks = []
    this.callbacks.push(callback)
    this.value = this.getVal()
  }

  getVal() {
    setTarget(this)
    let val = this.vm
    this.expression.split('.').forEach(element => {
      val = val[element]
    })
    cleanTarget()
    return val
  }

  update() {
    this.callbacks.forEach(cb => {
      cb()
    })
  }
}
