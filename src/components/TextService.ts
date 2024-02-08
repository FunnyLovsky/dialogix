import { END_MESSAGE, START_MESSAGE } from "@/lib/const";

export interface IMessage {
    copy: string,
    title: string
}

export default class TextService {
    static limitAll: number = 15000;
    static limitMsg: number = 3500;
    static textValue: string;
    static textLength: number;

    static initial(limitAll: number, limitMsg: number) {
        this.limitAll = limitAll ?? this.limitAll; 
        this.limitMsg = limitMsg ?? this.limitMsg;
    }

    static updateText(textValue: string) {
        this.textValue = textValue;
        this.textLength = textValue.length;

        return this.check()
    }

    static check() {
        if(this.textLength > this.limitAll) {
            console.log(`Сообщение слишком большое! ${this.textLength} > ${this.limitAll}`);
            return false
        } else if(this.textLength < this.limitMsg) {
            console.log(`Сообщение слишком маленькое! ${this.textLength} < ${this.limitMsg}`);
            return false
        } else {
            console.log('text length', this.textLength);
            return true
        }
    }

    static transformText() {
        const arrMsg: IMessage[] = [];
        const arrStr: string[] = [];
        let pos = 0;

        while (!(pos >= this.textValue.length)) {
            arrStr.push(this.textValue.slice(pos, pos + this.limitMsg));
            pos += this.limitMsg;
        }

        
        arrMsg.push({
            title: 'Скопировать начало', 
            copy: START_MESSAGE
        })
        
        arrStr.forEach((ms, index) => {
            const curr = index + 1;
            const all = arrStr.length;

            arrMsg.push({
                title: `Скопировать часть [${curr}/${all}]`,
                copy: this.createCopyMessage(ms, curr, all)
            })
        })

        arrMsg.push({
            title: 'Скопировать конец', 
            copy: END_MESSAGE
        });

        return arrMsg
    }

    static createCopyMessage(text: string, curr: number, all: number) {
        return `Пока отвечать не нужно. Это только часть текста, который я хочу вам отправить. Просто примите и подтвердите, как  "Часть ${curr}/${all} принята" и ждите следующей части.\n[НАЧАЛО ЧАСТИ ${curr}/${all}]\n\n${text}\n\n[КОНЕЦ ЧАСТИ ${curr}/${all}]`
    }
}