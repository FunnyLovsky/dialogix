export default class FileService {
    static parseFile = async (e: Event, textarea: HTMLTextAreaElement) => {
        const target = e.target as HTMLInputElement
        const files = target.files

        if (!(files && files.length > 0)) {
            throw new Error('Ошибка при обработке файла')
        }

        const file = files[0]
        console.log(file.type)

        switch (file.type) {
            case 'application/pdf':
                await new Promise((res) => setTimeout(() => res(''), 1000))
                textarea.value = await this.parsePDF(file)
                break

            case 'text/plain':
                await new Promise((res) => setTimeout(() => res(''), 1000))
                textarea.value = await file.text()
                break

            default:
                throw new Error('Данный формат нельзя обработать!')
        }
    }

    static async parsePDF(file: File) {
        return await new Promise<string>((resolve) => {
            const reader = new FileReader()
            let fullText = ''

            reader.readAsArrayBuffer(file)

            reader.onload = async () => {
                const arrayBuffer = reader.result
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i)
                    const content = await page.getTextContent()
                    const textItems = content.items.map((item: any) => item.str)
                    const text = textItems.join(' ')
                    fullText += text + '\n'
                }
                resolve(fullText)
            }
        })
    }
}
