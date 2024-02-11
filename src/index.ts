import Main from './components/Main';
import TextService from './components/TextService';
import './style';


Main.initial({
    button: document.querySelector('.btn'),
    container: document.querySelector('.part_inner'),
    textarea: document.querySelector('.text'),
    clear: document.querySelector('.clear'),
    file: document.querySelector('#file'),
    info: document.querySelector('.info'),
    count: document.querySelector('#count'),
    save: document.querySelector('.save'),
})

TextService.initial(20000)
