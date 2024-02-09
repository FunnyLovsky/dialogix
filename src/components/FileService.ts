
export default class FileService {
    static parseFile = async (e: Event, textarea: HTMLTextAreaElement) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        if (files && files.length > 0) {
            const file = files[0];
            console.log('Выбранный файл:', file.name);
            console.log('size', file.size);
            console.log('modif', new Date(file.lastModified));
            console.log('type', file.type);

            switch (file.type) {
                case 'application/pdf':
                    textarea.value = await this.parsePDF(file); 
                    break;
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    textarea.value = await this.parseDOCX(file)
                    break;

                default:
                    break;
            }
            
        }
  
    }

    static async parsePDF(file: File) {
        return await new Promise<string>((resolve) => {
            const reader = new FileReader();
            let fullText = '';
        
            reader.readAsArrayBuffer(file);

            reader.onload = async () => {
                const arrayBuffer = reader.result;
                const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const content = await page.getTextContent();
                    const textItems = content.items.map((item: any) => item.str);
                    const text = textItems.join(' ');
                    fullText += text + '\n';
                }
                console.log(fullText);
                resolve(fullText);
            };

        })
    }

    static async parseDOCX(file: File) {
        return await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = (event) => {
                if (event.target && event.target.result) {
                    const arrayBuffer = event.target.result as ArrayBuffer;
                    resolve('Пока что обратботка DOCX не функционирует')
                }
            };
 
        })
    }
}