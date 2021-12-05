class ToDoFormCreate {
  constructor(data, formElement) {
    this.data = data
    this.formElement = formElement
    this.#init()
  }

  #init() {
    this.handleSubmit = this.#handleSubmit.bind(this)

    this.formElement.addEventListener('submit', this.handleSubmit)
  }

  #handleSubmit(event) {
    event.preventDefault()

    const todo = {
      id: new Date().getTime(),
      isCheked: false,
    }

    const formData = new FormData(this.formElement)
    for (let [name, value] of formData.entries()) {
      todo[name] = value
    }

    this.data.push(todo)
    this.formElement.reset()

    window.dispatchEvent(new Event('render:need'))
    window.dispatchEvent(new Event('save:need'))
  }
}

export { ToDoFormCreate }
