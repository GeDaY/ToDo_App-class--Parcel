class ToDoStorage {
  data = JSON.parse(localStorage.getItem('appData')) || []

  constructor() {
    this.#init()
  }

  #init() {
    this.handleSave = this.#handleSave.bind(this)
    this.handleAppReady = this.#handleAppReady.bind(this)

    window.addEventListener('save:need', this.handleSave)
    window.addEventListener('app:ready', this.handleAppReady)
  }

  #handleSave() {
    localStorage.setItem('appData', JSON.stringify(this.data))
  }

  #handleAppReady() {
    if (this.data.length) window.dispatchEvent(new Event('render:need'))
  }
}

export { ToDoStorage }
