export interface IStart {
    textarea: HTMLTextAreaElement, 
    button: HTMLButtonElement, 
    container: HTMLDivElement,
    limitAll?: number,
    limitMsg?: number
}

interface IMessage {
    copy: string,
    title: string
}

export default class Initail {
    static textarea: HTMLTextAreaElement;
    static button: HTMLButtonElement;
    static container: HTMLDivElement
    static limitAll: number = 15000;
    static limitMsg: number = 3500;
    static startMsg: IMessage = {title: 'Скопировать начало', copy: `Общая длина контента, который я хочу отправить вам, слишком велика, чтобы отправить в одном куске.\n\nДля отправки этого контента я буду следовать следующему правилу:\n\n[НАЧАЛО ЧАСТИ 1/10]\n\n/* содержание части 1 из 10 в общей сложности. */\n\n[КОНЕЦ ЧАСТИ 1/10]\n\nТогда вы просто отвечаете: 'Полученная часть 1/10'\n\nКогда я скажу вам 'ВСЕ ЧАСТИ ОТПРАВЛЕНЫ', тогда вы можете продолжать обработку данных и ответить на мои запросы.`};
    static endMsg: IMessage = {title: 'Скопировать конец', copy: 'конец'};

    static start(obj: IStart) {
        if (!obj) return; 

        const { textarea, button, container, limitAll, limitMsg } = obj; 

        this.textarea = textarea;
        this.button = button;
        this.container = container;
        this.limitAll = limitAll ?? this.limitAll; 
        this.limitMsg = limitMsg ?? this.limitMsg;

        this.button.addEventListener('click',  this.onClick);
        
    }

    static onClick = () => {
        if(!this.check()) return;
        
        const text = this.textarea.value;
        console.log('text length', text.length);
        
        const arrMsg: string[] = [];
        let pos = 0;
        let isRead = false;
        let count = 0;

        while (!isRead) {
            const segment = text.slice(pos, pos + this.limitMsg); 

            count += 1; 
            arrMsg.push(segment);
            pos += this.limitMsg;

            if (pos >= text.length) {
                isRead = true;
            }
        }

        this.render(arrMsg);
    }

    static check() {
        const text = this.textarea.value.length;

        if(text > this.limitAll) {
            console.log(`Сообщение слишком большое! ${text} > ${this.limitAll}`);
            return false
        } else if(text < this.limitMsg) {
            console.log(`Сообщение слишком маленькое! ${text} < ${this.limitMsg}`);
            return false
        } else {
            return true
        }
    }

    static render(arr: string[]) {
        const arrHTML: Element[] = [];
        const arrMsg: IMessage[] = [];

        arrMsg.push(this.startMsg)
        
        arr.forEach((ms, index) => {
            arrMsg.push({
                title: `Скоировать часть [${index + 1}/${arr.length}]`,
                copy: ms
            })
        })

        arrMsg.push(this.endMsg);

        arrMsg.forEach(msg => {
            arrHTML.push(createMessage(msg.title, msg.copy));
            console.log(msg);
        })

        function createMessage(title: string, copy: string) {
            const cont = document.createElement('div');
            cont.className = 'part_cont';
            cont.onclick = () => {
                navigator.clipboard.writeText(copy)
            }
            
            const p = document.createElement('p');
            p.className = 'part_item';
            p.append(title);
            cont.append(p);
            
            return cont
        }

        this.container.append(...arrHTML)
    }
}