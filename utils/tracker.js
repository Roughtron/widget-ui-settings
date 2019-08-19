class Tracker {
  trackYaEvent (type) {
    if (window.yaCounter50043958) {
      window.yaCounter50043958.reachGoal(type)
    }
  }

  trackGaEvent (category, action, label = '') {
    if (window.ga) {
      window.ga('send', 'event', category, action, label)
    }
  }
}

let tracker = new Tracker()
export default tracker
