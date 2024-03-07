import DataBase from './components/DataBase'
import Main from './components/Main'
import TextService from './components/TextService'
import './style'

Main.initial({
    button: document.querySelector('.btn'),
    container: document.querySelector('.part_inner'),
    textarea: document.querySelector('.text'),
    clear: document.querySelector('.clear'),
    file: document.querySelector('#file'),
    info: document.querySelector('.info'),
    count: document.querySelector('#count'),
    save: document.querySelector('.save'),
    fetch: document.querySelector('.fetch'),
    select: document.querySelector('#select'),
    copy: document.querySelector('.copy'),
    delete: document.querySelector('.delete'),
    scopeText: document.querySelector('#scopeText'),
    scopeMessage: document.querySelector('#scopeMessage'),
})

DataBase.inital()
