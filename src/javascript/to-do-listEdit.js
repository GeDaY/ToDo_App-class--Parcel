class ToDoListEdit {
  editedTodo = {}
  isEdit = false

  constructor(data, listElem) {
    this.data = data
    this.listElem = listElem
    this.#init()
  }

  #init() {
    this.handleClickEditBtn = this.#handleClickEditBtn.bind(this)
    this.handleTodoEditSubm = this.#handleTodoEditSubm.bind(this)
    this.handleClickCancelBtn = this.#handleClickCancelBtn.bind(this)

    this.listElem.addEventListener('click', this.handleClickEditBtn)
    this.listElem.addEventListener('submit', this.handleTodoEditSubm)
    this.listElem.addEventListener('click', this.handleClickCancelBtn)
  }

  #handleClickEditBtn(event) {
    const { target } = event
    const { role, id } = target.dataset

    if (role == 'edit') {
      if (this.isEdit == true) {
        alert('finish editing')
        return
      }

      this.data.forEach((item) => {
        if (item.id == id) {
          this.editedTodo = item

          const { parentElement } = target

          parentElement.outerHTML = this.template(item)

          this.isEdit = true
        }
      })
    }
  }

  #handleTodoEditSubm(event) {
    event.preventDefault()

    const { target } = event
    const { role } = target.dataset

    if (role == 'todoEdit') {
      const editedContent = target.querySelector('[name="content"]').value

      this.editedTodo.todo_content = editedContent

      window.dispatchEvent(new Event('render:need'))
      window.dispatchEvent(new Event('save:need'))

      this.isEdit = false
    }
  }

  #handleClickCancelBtn(event) {
    const { role } = event.target.dataset
    if (role == 'cancelEdit') {
      window.dispatchEvent(new Event('render:need'))

      this.isEdit = false
    }
  }

  template({ todo_content }) {
    const template = `
    <form class="d-flex p-2 border border-1 rounded-3" data-role="todoEdit">
  
      <div class="flex-grow-1 me-3">
        <input type="text" class="form-control form-control-sm" placeholder="edit a task" name="content" required value="${todo_content}">
      </div>
  
      <button type="submit" class="btn btn-sm btn-success">
        <svg class="pe-none" width="16" height="16">
          <use href="#confirm" />
        </svg>
      </button>
  
      <button type="button" data-role="cancelEdit" class="btn btn-sm btn-warning ms-2">
        <svg class="pe-none" width="16" height="16">
          <use href="#cancel" />
        </svg>
      </button>
  
    </form>
  `
    return template
  }
}

export { ToDoListEdit }
