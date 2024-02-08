import FileService from "./FileService";
import RenderService from "./RenderService";
import TextService from "./TextService";

export interface IStart {
    textarea: HTMLTextAreaElement, 
    button: HTMLButtonElement, 
    clear: HTMLButtonElement, 
    container: HTMLDivElement,
    file: HTMLInputElement
}

export default class Main {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static clear: HTMLButtonElement;
    static container: HTMLDivElement
    static file: HTMLInputElement;

    static initial(obj: IStart) {
        if (!obj) return; 

        const { textarea, button, container, clear, file } = obj; 

        this.textarea = textarea;
        this.button = button;
        this.clear = clear;
        this.container = container;
        this.file = file;

        this.file.addEventListener('change', this.onFileHandler)
        this.button.addEventListener('click',  this.onBtnHandler);
        this.clear.addEventListener('click', this.onClearHandler);
    }


    static onBtnHandler = () => {
        RenderService.clearMessage(this.container);

        if(!TextService.updateText(this.textarea.value)) return;

        const arrMsg = TextService.transformText()
        
        RenderService.render(arrMsg, this.container);
    }

    static onClearHandler = () => {
        this.textarea.value = '';
        RenderService.clearMessage(this.container)
    }

    static onFileHandler = (event: Event) => {
        RenderService.clearMessage(this.container)
        FileService.parseFile(event, this.textarea)
    }
}