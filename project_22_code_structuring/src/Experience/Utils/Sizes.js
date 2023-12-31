import EventEmmiter from './EventEmmiter.js'

export default class Sizes extends EventEmmiter {
  constructor () {

    super()

    // Setup
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    
    // Resize
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    
      this.trigger('resize')
    })
  }
}