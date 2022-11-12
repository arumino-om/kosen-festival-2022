import { Dialog } from "./dialog";

export class ButtonFunc {
  public static postButton(dialog_cls: Dialog) {
    dialog_cls.show();
  }

  public static goUpButton() {
    window.scrollTo(0, 0);
  }

  public static goDownButton() {
    window.scrollTo(0, window.innerHeight);
  }
}