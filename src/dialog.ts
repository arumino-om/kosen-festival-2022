export class Dialog {
  private target_elm: HTMLElement;

  constructor(target_elm: HTMLElement) {
    this.target_elm = target_elm;
  }

  public show() {
    this.target_elm.classList.add("dialog-show");
  }

  public close() {
    this.target_elm.classList.remove("dialog-show");
  }
}