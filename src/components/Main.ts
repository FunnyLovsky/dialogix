import FileService from "./FileService";
import RenderService from "./RenderService";
import TextService from "./TextService";

export interface IStart {
    textarea: HTMLTextAreaElement, 
    button: HTMLButtonElement, 
    clear: HTMLButtonElement, 
    container: HTMLDivElement,
    file: HTMLInputElement,
    info: HTMLDivElement
}

export default class Main {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static clear: HTMLButtonElement;
    static container: HTMLDivElement
    static file: HTMLInputElement;
    static info: HTMLDivElement

    static initial(obj: IStart) {
        if (!obj) return; 

        const { textarea, button, container, clear, file, info } = obj; 

        this.textarea = textarea;
        this.button = button;
        this.clear = clear;
        this.container = container;
        this.file = file;
        this.info = info;

        this.file.addEventListener('change', this.onFileHandler)
        this.button.addEventListener('click',  this.onBtnHandler);
        this.clear.addEventListener('click', this.onClearHandler);
    }


    static onBtnHandler = () => {
        try {
            TextService.updateText(this.textarea.value);
            TextService.check()
    
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
    }

    static onFileHandler = async (event: Event) => {
        try {
            RenderService.clearMessage(this.container);
            await FileService.parseFile(event, this.textarea, this.info)
        } catch (error) {
            RenderService.openInfo(this.info, 'err', error.message)
        }

    }
}