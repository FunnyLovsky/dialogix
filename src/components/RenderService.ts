import { IMessage } from "./TextService";

export default class RenderService {

    static render(arrMsg: IMessage[], container: HTMLDivElement) {
        const arrHTML: Element[] = []
        
        arrMsg.forEach(msg => {
            const cont = document.createElement('div');
            const p = document.createElement('p');

            cont.className = 'part_cont';
            p.className = 'part_item';

            cont.onclick = () => {
                navigator.clipboard.writeText(msg.copy)
            }
            
            p.append(msg.title);
            cont.append(p);

            arrHTML.push(cont)
        })

        container.append(...arrHTML)
    }

    static clearMessage(container: HTMLDivElement) {
        if(container.firstChild) {
            while(container.firstChild) {
                container.removeChild(container.firstChild);
                console.log('del');
            }
        }
    }
}