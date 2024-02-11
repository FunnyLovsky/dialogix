import FileService from "./FileService";
import RenderService from "./RenderService";
import TextService from "./TextService";

export interface IStart {
    textarea: HTMLTextAreaElement, 
    button: HTMLButtonElement, 
    clear: HTMLButtonElement, 
    container: HTMLDivElement,
    file: HTMLInputElement,
    info: HTMLDivElement,
    count: HTMLSpanElement,
}

export default class Main {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static clear: HTMLButtonElement;
    static container: HTMLDivElement
    static file: HTMLInputElement;
    static info: HTMLDivElement;
    static count: HTMLSpanElement;

    static initial(obj: IStart) {
        if (!obj) return; 

        const { textarea, button, container, clear, file, info, count } = obj; 

        this.textarea = textarea;
        this.button = button;
        this.clear = clear;
        this.container = container;
        this.file = file;
        this.info = info;
        this.count = count;

        this.textarea.addEventListener('input', this.onTextAreaHandler);
        this.file.addEventListener('change', this.onFileHandler)
        this.button.addEventListener('click',  this.onBtnHandler);
        this.clear.addEventListener('click', this.onClearHandler);
    }

    static onTextAreaHandler = () => {
        const value = this.textarea.value.length;
        this.count.innerHTML = value.toString();
        
        this.count.classList.toggle('much', TextService.isBigCount(value));
        this.count.style.animation = 'none';
    
        this.count.offsetHeight;
        this.count.style.animation = 'count .5s ease-in-out';
    }


    static onBtnHandler = () => {
        try {
            TextService.updateText(this.textarea.value);
            TextService.check();
            
            const arrMsg = TextService.transformText()
            
            RenderService.render(arrMsg, this.container);
        } catch (error) {
            RenderService.openInfo(this.info, 'err', error.message)
        }
 
    }

    static onClearHandler = () => {
        this.textarea.value = '';
        this.file.value = '';
        RenderService.clearMessage(this.container);
        this.onTextAreaHandler()
    }

    static onFileHandler = async (event: Event) => {
        try {
            RenderService.clearMessage(this.container);
            RenderService.openInfo(this.info, 'notify', 'Идет обработка файла...');
            await FileService.parseFile(event, this.textarea);
            RenderService.openInfo(this.info, 'notify', 'Файл обработан!');
            this.onTextAreaHandler()
        } catch (error) {
            RenderService.openInfo(this.info, 'err', error.message)
        }

    }
}