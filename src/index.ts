import Main from './components/Main';
import './style';


Main.initial({
    button: document.querySelector('.btn'),
    container: document.querySelector('.part_inner'),
    textarea: document.querySelector('.text'),
    limitMsg: 1000,
    limitAll: 20000
})

