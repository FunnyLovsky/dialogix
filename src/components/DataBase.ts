import Main from "./Main";
import RenderService from "./RenderService";

export default class DataBase extends Main {
    static inital() {
        this.save.addEventListener('click', this.saveData);
        this.fetch.addEventListener('click', this.onWindowHandler)
        window.addEventListener('load', this.onWindowHandler);
    }

    static saveData = () => {
        this.save.innerHTML = 'Сохранено!'
        localStorage.setItem('data', this.textarea.value);
        RenderService.openInfo(this.info, 'notify', 'Данные сохранены!');
    }

    static onWindowHandler = async () => {
        RenderService.openInfo(this.info, 'notify', 'Идет загрузка данных...');
        this.textarea.disabled = true
        await new Promise(res => setTimeout(() => res(''), 1000))
        this.textarea.value = localStorage.getItem('data') || '';
        this.textarea.disabled = false
        RenderService.openInfo(this.info, 'notify', 'Загрузка завершена');
        this.onTextAreaHandler()
    }

}