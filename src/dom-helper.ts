export class DomHelper {
    addLineToTextarea(el: HTMLTextAreaElement, text: string): void {
        el.value += text + '\n';
    }
}
