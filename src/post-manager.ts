export class PostManager {
  private postContents: PostContent[] = [];
  private postView: HTMLElement = <HTMLElement>document.getElementById("posts");
  private fixedPost: PostContent = {
    name: "##Administrator##",
    datetime: new Date(),
    content: `ようこそ Nyan^chat へ
    このプログラムは、伝言板のようにローカル内で自由に文字を投稿できるプログラムです。みなさんも「＋」ボタンから自由に投稿してみてください。
    \n
    ご利用になる前に、以下の事項に同意ください。
    (1) 基本的に、何でも投稿して構いません。誰かへのメッセージでもいいし、書き置きしてもいいし、何らかの宣伝をしても構いません。
    (2) ただし、下ネタや誹謗中傷等、不適切な投稿は行わないでください。酷い場合は新規投稿を禁じる可能性があります。
    (3) 500字を超える投稿はできません。
    (4) 1002スレを超えると自動で全削除されます。
    (5) # は通常使用できません。使用できるのは管理者のみです。
    (6) 名前を自由に設定できる関係上、偽造等が行われる可能性があります。だからここに書いてることはあまり信用しないほうがいいかも
    `
  };

  constructor() {
    this.postContents.push(this.fixedPost);

    (window as any).postmgr = this;
  }

  /**
   * 新規投稿を行います。
   * @param name 名前
   * @param content 内容
   * @param force 名前の変換を行わずに投稿するかどうか
   * @returns 
   */
  public addPost(name: string, content: string, force: boolean): boolean {
    if (content == "" || content.length > 500) return false;
    if (name == "") name = "名無しの逸般高専生";

    // 1000スレ超えてたら消す
    if (this.postContents.length > 1001) {
      this.postContents = [];
      this.postContents.push(this.fixedPost);
      let sysmsg: PostContent = {
        name: "##SYSTEM##",
        content: "1002スレ超えたため、自動で削除されました。",
        datetime: new Date()
      };
      this.postContents.push(sysmsg);
      this.reRenderToUI();
    }

    // 使用不可能文字を置き換え
    if (!force) {
      name = name.replace(/#/g, '?');
      name = name.replace(/＃/g, '？');
    }

    // 変数初期化
    let newpost: PostContent = {
      name: name,
      datetime: new Date(),
      content: content
    };

    // 追加・UI反映
    this.postContents.push(newpost);
    this.appendToUI(newpost);

    return true;
  }

  public removePost(id: number) {
    this.postContents.splice(id - 1, 1);
    this.reRenderToUI();
  }

  public reRenderToUI() {
    let oldPostContents = this.postContents;
    this.postContents = [];
    this.postView.innerHTML = "";

    oldPostContents.forEach(item => {
      this.postContents.push(item);
      this.appendToUI(item);
    });
  }

  private appendToUI(post: PostContent) {
    let htmlContent = this.convertNormalString2HTMLString(post.content);
    let template = `
    <div class="post-data">
      <p class="post-from">${this.postContents.length}. ${post.name} - ${post.datetime.toDateString()}</p>
      ${htmlContent}
    </div>
    `;

    let oldHtmls = this.postView.innerHTML;
    this.postView.innerHTML = template + oldHtmls;
  }

  private convertNormalString2HTMLString(text: string): string {
    let splitted = text.split("\n");
    let newString = "";
    
    splitted.forEach((line) => {
      if (line == "") newString = newString + "<br>";
      else newString = newString + "<p>" + line + "</p>";
    });

    return newString;
  }
}