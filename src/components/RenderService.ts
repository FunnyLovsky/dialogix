import { IMessage } from "./TextService";

type InfoType = 'err' | 'notify';

export default class RenderService {
    static currentInfo: HTMLDivElement | null = null;

    static render(arrMsg: IMessage[], container: HTMLDivElement) {
        const arrHTML: Element[] = []
        
        arrMsg.forEach(msg => {
            const cont = document.createElement('div');
            const p = document.createElement('p');

            cont.className = 'part_cont';
            p.className = 'part_item';
            let content: string[] = [];

            cont.onclick = () => {
                if(content.length === 0) {
                    content = p.innerHTML.split(' ');
                    content[0] = 'Скопировано';
                    p.innerHTML = 'Скопировано';
                }
                navigator.clipboard.writeText(msg.copy);
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


    static openInfo(info: HTMLDivElement, type: InfoType, content: string) {
        if (this.currentInfo) {
            this.closeInfo(this.currentInfo, type);
        }
        
        info.className = 'info';
        info.classList.add(type);
        info.textContent = content;
        info.style.opacity = '1';

        this.currentInfo = info;

        new Promise((resolve) => 
            setTimeout(() => resolve(''), 2000)
        ).then(() => this.closeInfo(info, type));
    }

    static closeInfo(info: HTMLDivElement, type: InfoType) {
        info.style.opacity = '0';
        info.classList.remove(type);
        this.currentInfo = null;
    } 
}