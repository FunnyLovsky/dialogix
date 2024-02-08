import RenderService from "./RenderService";
import TextService from "./TextService";

export interface IStart {
    textarea: HTMLTextAreaElement, 
    button: HTMLButtonElement, 
    container: HTMLDivElement,
    limitAll?: number,
    limitMsg?: number
}


export default class Main {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static container: HTMLDivElement

    static initial(obj: IStart) {
        if (!obj) return; 

        const { textarea, button, container, limitAll, limitMsg } = obj; 

        this.textarea = textarea;
        this.button = button;
        this.container = container;
        
        TextService.initial(limitAll, limitMsg)

        this.button.addEventListener('click',  this.onClick);
        console.log('inital');
        
    }

    static onClick = () => {
        RenderService.clearMessage(this.container);
        
        if(!TextService.updateText(this.textarea.value)) return;

        const arrMsg = TextService.transformText()
        
        RenderService.render(arrMsg, this.container);
    }
}