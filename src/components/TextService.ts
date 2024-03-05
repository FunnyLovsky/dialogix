import { END_MESSAGE, START_MESSAGE } from '@/lib/const'
import RenderService from './RenderService'

export interface IMessage {
    copy: string
    title: string
}

export default class TextService {
    static limitAll: number
    static limitMsg: number
    static textValue: string
    static textLength: number

    static initial(limitAll: number = 15000, limitMsg: number = 3500) {
        this.limitAll = limitAll
        this.limitMsg = limitMsg
    }

    static updateText(textValue: string) {
        this.textValue = textValue
        this.textLength = textValue.length
    }

    static check() {
        if (this.textLength > this.limitAll) {
            throw new Error(`Сообщение слишком большое! ${this.textLength} > ${this.limitAll}`)
        }

        if (this.textLength < this.limitMsg) {
            throw new Error(`Сообщение слишком маленькое! ${this.textLength} < ${this.limitMsg}`)
        }
    }

    static isBigCount(count: number) {
        return count > this.limitAll
    }

    static transformText() {
        const arrMsg: IMessage[] = []
        const arrStr: string[] = []
        let pos = 0

        while (!(pos >= this.textValue.length)) {
            arrStr.push(this.textValue.slice(pos, pos + this.limitMsg))
            pos += this.limitMsg
        }

        arrMsg.push({
            title: 'Скопировать начало',
            copy: START_MESSAGE,
        })

        arrStr.forEach((ms, index) => {
            const curr = index + 1
            const all = arrStr.length

            arrMsg.push({
                title: `Скопировать часть [${curr}/${all}]`,
                copy: this.createCopyMessage(ms, curr, all),
            })
        })

        arrMsg.push({
            title: 'Скопировать конец',
            copy: END_MESSAGE,
        })

        return arrMsg
    }

    static createCopyMessage(text: string, curr: number, all: number) {
        return `Пока отвечать не нужно. Это только часть текста, который я хочу вам отправить. Просто примите и подтвердите, как  "Часть ${curr}/${all} принята" и ждите следующей части.\n[НАЧАЛО ЧАСТИ ${curr}/${all}]\n\n${text}\n\n[КОНЕЦ ЧАСТИ ${curr}/${all}]`
    }
}
