export class Dep {
  constructor() {
    this.deppend = []
  }
  add() {
    Dep.target && this.deppend.push(Dep.target)
  }
  notify() {
    this.deppend.forEach(target => {
      target.update()
    })
  }
}
Dep.target = null

export function setTarget(target) {
  Dep.target = target
}

export function cleanTarget() {
  Dep.target = null
}
