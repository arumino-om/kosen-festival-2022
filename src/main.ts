import { ButtonFunc } from "./button-func";
import { Dialog } from "./dialog";
import { PostManager } from "./post-manager";

window.onload = () => {
  let goUpButton = document.getElementById("top-button");
  let goDownButton = document.getElementById("bottom-button");
  let postButton = document.getElementById("post-button");
  let postSubmitButton = document.getElementById("post-submit-button");
  let postCancelButton = document.getElementById("post-cancel-button");

  let dialogMng = new Dialog(<HTMLElement>document.getElementById("post-dialog"));
  let postMng = new PostManager();

  let postInputName = <HTMLInputElement>document.getElementById("post-input-name");
  let postInputContent = <HTMLTextAreaElement>document.getElementById("post-input-content");

  goUpButton?.addEventListener("click", () => {ButtonFunc.goUpButton()});
  goDownButton?.addEventListener("click", () => {ButtonFunc.goDownButton()});
  postButton?.addEventListener("click", () => {dialogMng.show()});

  postSubmitButton?.addEventListener("click", () => {
    let result = postMng.addPost(postInputName.value, postInputContent.value, false);
    if (result) {
      postInputName.value = "";
      postInputContent.value = "";
      dialogMng.close();
    }
  })
  postCancelButton?.addEventListener("click", () => {dialogMng.close()});

  postMng.reRenderToUI();
}