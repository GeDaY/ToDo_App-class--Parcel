// Styles
import './app.scss'

// Modules
import { ToDoList } from '../javascript/to-do-list'
import { ToDoFormCreate } from '../javascript/to-do-form'
import { ToDoListEdit } from '../javascript/to-do-listEdit'
import { ToDoStorage } from '../javascript/to-do-storage'

const formElem = document.querySelector('#form')
const listElem = document.querySelector('#list')

const storage = new ToDoStorage()
const data = storage.data
new ToDoFormCreate(data, formElem)
new ToDoList(data, listElem)
new ToDoListEdit(data, listElem)
