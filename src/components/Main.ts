
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
    save: HTMLButtonElement,
    fetch: HTMLButtonElement,
    select: HTMLSpanElement,
    copy: HTMLButtonElement,
    delete: HTMLButtonElement,
}

export default class Main {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static clear: HTMLButtonElement;
    static container: HTMLDivElement
    static file: HTMLInputElement;
    static info: HTMLDivElement;
    static count: HTMLSpanElement;
    static save: HTMLButtonElement;
    static fetch: HTMLButtonElement;
    static select: HTMLSpanElement;
    static copy: HTMLButtonElement;
    static delete: HTMLButtonElement;

    static initial(obj: IStart) {
        if (!obj) return; 

        this.textarea = obj.textarea;
        this.button = obj.button;
        this.clear = obj.clear;
        this.container = obj.container;
        this.file = obj.file;
        this.info = obj.info;
        this.count = obj.count;
        this.save = obj.save;
        this.fetch = obj.fetch
        this.select = obj.select;
        this.copy = obj.copy;
        this.delete = obj.delete;

        this.textarea.addEventListener('input', () => this.onTextAreaHandler(this.count, this.textarea.value));
        this.file.addEventListener('change', this.onFileHandler)
        this.button.addEventListener('click',  this.onBtnHandler);
        this.clear.addEventListener('click', this.onClearHandler);
        this.copy.addEventListener('click', () => {
            navigator.clipboard.writeText(this.textarea.value);
        })
        document.addEventListener('selectionchange', (event: Event): void => {
            if (event.type === 'selectionchange') {
                const selection = document.getSelection();
                if (selection) {
                    this.onTextAreaHandler(this.select, selection.toString())
                }
            }
        })
    }

    static onWindowHandler = async () => {
        RenderService.openInfo(this.info, 'notify', 'Идет загрузка данных...');
        this.textarea.disabled = true
        await new Promise(res => setTimeout(() => res(''), 1000))
        this.textarea.value = localStorage.getItem('data') || '';
        this.textarea.disabled = false
        RenderService.openInfo(this.info, 'notify', 'Загрузка завершена');
        this.onTextAreaHandler(this.count, this.textarea.value)
    }


    static onTextAreaHandler = (element: HTMLElement, value: string) => {
        element.innerHTML = value.length.toString();
        element.classList.toggle('much', TextService.isBigCount(value.length));
        element.style.animation = 'none';
    
        element.offsetHeight;
        element.style.animation = 'count .5s ease-in-out';
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
        this.onTextAreaHandler(this.count, this.textarea.value)
    }

    static onFileHandler = async (event: Event) => {
        try {
            RenderService.clearMessage(this.container);
            RenderService.openInfo(this.info, 'notify', 'Идет обработка файла...');
            await FileService.parseFile(event, this.textarea);
            RenderService.openInfo(this.info, 'notify', 'Файл обработан!');
            this.onTextAreaHandler(this.count, this.textarea.value)
        } catch (error) {
            RenderService.openInfo(this.info, 'err', error.message)
        }

    }
}