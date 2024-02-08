import './style';
import style from './style/style.module.scss'


function startApp() {
    const root = document.getElementById('root');

    const textArea = document.createElement('textarea');
    textArea.className = style.text;
    textArea.placeholder = 'Введите ваш текст...';

    const btn = document.createElement('button');
    btn.textContent = 'Создать';


    root.append(textArea);
    root.append(btn);

    btn.onclick = () => {
        const msg = textArea.value.length;

        if(msg > 15000) {
            console.log('Слишком большое сообщение!', msg);
            return
        }
          

        
        
    }
    console.log("work");
}

startApp()


