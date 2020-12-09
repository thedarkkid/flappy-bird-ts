export default class GameElement{
    readonly element: HTMLElement;
    readonly selector: string;

    constructor(selector: string) { this.element = document.querySelector(selector);};

    changeProperty = (property: string, value:any): void => {
        // @ts-ignore
        this.element[property] = `value`;
    };

    changeContent = (content: HTMLElement): void => {this.element.innerHTML  = `${content}`};
    appendContent = (content: HTMLElement): void => {this.element.innerHTML += `${content}`};
    getChild = (childSelector: string):GameElement => { return new GameElement(`${this.selector} ${childSelector}`);}
}