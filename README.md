# Open MT Editor Screen

Chrome拡張機能を利用して、現在開いているタブのMT編集画面を開く試みです。

## 動作イメージ

[![記事ページを開きブラウザに表示されているMovable Typeのロゴをクリックすると、該当するMovable Typeの記事編集画面が開きます。](http://img.youtube.com/vi/OCwVthRIg9Q/0.jpg)](https://www.youtube.com/watch?v=OCwVthRIg9Q)

## ファイルの情報について

現在はHTMLファイルに記事IDなどを埋め込んでいますが、この情報は`mt_fileinfo`テーブルに格納されているそうです。

### Perl

```
use MT::FileInfo;
use MyDebugger;
my $fileinfo = MT::FileInfo->load({ url => '/2016/05/mt-archived-entries-plugin.html' });
MyDebugger::doLog($fileinfo,1);
```

### 出力される情報

```
bless( {
  '__core_final_post_load_mark' => 1,
  '__is_stored' => 1,
  '__triggers' => {},
  '_class_trigger_results' => [],
  'column_values' => {
    'archive_type' => 'Individual',
    'author_id' => undef,
    'blog_id' => '1',
    'category_id' => undef,
    'entry_id' => '164',
    'file_path' => '/path/to/host/htdocs/2016/05/mt-archived-entries-plugin.html',
    'id' => '255',
    'startdate' => undef,
    'template_id' => '477',
    'templatemap_id' => '51',
    'url' => '/2016/05/mt-archived-entries-plugin.html',
    'virtual' => undef
  }
}, 'MT::FileInfo' )
```

## 今後の開発予定

- DataAPIのエンドポイントを追加して、ブログID・記事ID・classを取得する
- 拡張の設定画面を作成し、ドメインとMTのURLを登録可能にする

## 商標について

Movable Type は Six Apart, Ltd. の商標または登録商標です。

