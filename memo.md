## 実装で参考にしたものを記述していく

- NextjsにBootstrapとReact Bootstrapの導入
[参考記事](https://maku.blog/p/k8mxakw/)

### 下書き機能の実装について

＜前提＞

microCMS側で公開データか下書きデータかを区別するため、shemeで公開情報、または下書き情報を保存して
そのデータの真偽値でフロント側で表示を分ける

実装Flow

- ユーザーが投稿をデータ入力
  - ユーザー入力したデータの値を取得する
- ユーザーが公開・下書きを選択して投稿する
  - 投稿のデータ(下書き:Flase)、下書きデータ（下書き:True）を準備して、POSTして、microCMSヘ投稿を行う
- microCMSに登録されたデータが作成しているアプリ上に反映される
  - 再ビルド（webhookでmicroCMSからVecelへ連絡、Next.jsでBuildが走る→再レンダリング？）して、投稿データを取得・表示
- ユーザーが公開データ(下書き:Flase)の一覧を確認できる
  - microCMSからGETして、真偽値でfilter
- ユーザーが下書きデータ(下書き:True)の一覧を確認できる
  - microCMSからGETして、真偽値でfilter
- 公開データ(下書き:Flase)の個々の投稿の詳細を確認できる
  - GETした情報からIDを抽出してPATHとして渡して個別でデータを渡す（）
- 下書きデータ(下書き:True)の個々の投稿の詳細を確認できる（できればモーダル）
  - GETした情報をkeyを設定してモーダルに渡してあげる
- 下書き情報の入ったモーダルで内容の編集をして保存ができる
  - 下書きデータ（下書き:True）を準備して,PATCH(編集)して、microCMSヘ投稿を行う
- 下書き情報の入ったモーダルで内容の編集または、そのまま公開をすることができる
  - 下書きデータ（下書き:False）を準備して,PATCH(編集)して、
    microCMSヘ投稿を行う
- 下書き情報の入ったモーダルで確認している下書きデータを削除することができる
  - 該当の下書きデータに対して,IDなどで？microCMS上のデータをDELETEする


#### useStateのエラーについて

- エラー文
```
React Hook "useState" is called in function "draftList" 
that is neither a React function component 
nor a custom React Hook function. 
React component names must start with an uppercase letter.
```

export default function draftListのように
関数コンポーネントを定義する際は、大文字で始めないといけないとエラーが出ていた。
なぜかuseStateのところでエラーが出たので少しつまずいたけど、
理解できてよかった。

調べていた思ったけど、
`export default function 関数名()`
この書き方より、constで関数式を宣言して、
最後にexport defaultしてあげたほうがみやすいように思う？
どうかな？
<参考>
[React Hooksのルールをよく理解しないとハマるエラー対処法 - Qiita](https://qiita.com/tatsumin0206/items/4e1076e2deedf20a9485)

[解決の役に立った記事](https://dev.to/ranewallin/js-bites-react-hook-is-called-in-a-function-which-is-neither-a-react-function-or-sic-a-custom-react-hook-1g2c)

## useFormを導入して記述変更

useStateを使ってデータの更新をハンドリングしていたが、useFormを使えば、{...register("タイトル")}ってするだけで、
{タイトル: value}みたいにできるので、記述減って楽だしわかりやすい気がしたので導入

[参考記事](https://react-hook-form.com/get-started/#IntegratingwithUIlibraries)
## onDraftSubmitとonSubmitに分けて同じような記述をしてしまっている問題について

現状、hundleSubmitからonsubmitを送っているが、多分その間にもう一つ関数を挟めば、いける？
この方法も冗長すぎる気がする・・・