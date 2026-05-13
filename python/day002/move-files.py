import json
from pathlib import Path
import shutil
from datetime import datetime
import argparse

"""
動かすには
コマンド：python move-files.py --config 設定jsonファイルの絶対パス

設定jsonファイル
{
  "from": "移動元の絶対パス",
  "to": "移動先の絶対パス",
  "valid_suffixes": ["許容する拡張子リスト"],
  "ignore_suffixes": ["無視する拡張子リスト"],
  "categorize_type": 分類方法
                        "" なら移動だけ
                        "suffix" なら拡張子ごと
                        "cmonth" なら作成月ごと
}
"""



def get_config():
    parser = argparse.ArgumentParser()
    parser.add_argument("--config", required=True, help="JSON設定のファイルパス")
    args = parser.parse_args()

    config_path = Path(args.config)

    if config_path.exists():
        if not config_path.is_absolute():
            print("エラー：configのパスは絶対パスを使用してください")
            return None
        try:
            config: dict = json.loads(config_path.read_text(encoding="utf-8"))
            print(f"Config loaded: {config}")
            return config
        except json.JSONDecodeError:
            print("エラー：config.jsonの形式が正しくありません")
            return None
    else:
        print(f"エラー：{config_path}が見つかりません")
        return None

def remove_dot(text: str):
    if text.startswith("."):
        return text[1:]
    else:
        return text

def is_valid_suffix(suffix: str, valid_suffixes: list[str], ignore_suffixes: list[str]):
    # 引数の suffix は既に remove_dot されている前提
    
    if len(valid_suffixes) == 0:
        return suffix not in ignore_suffixes
    else:
        return suffix in valid_suffixes and suffix not in ignore_suffixes

def get_categorize_path(file_path: Path, categorize_type: str | None):
    if not file_path:
        return None

    if not categorize_type:
        return file_path
    
    info = file_path.stat()
    # ナノ秒を秒に変換（1,000,000,000で割る）
    seconds = info.st_ctime_ns / 1_000_000_000
    # datetimeオブジェクトに変換
    cdt = datetime.fromtimestamp(seconds)

    add_path = None

    if categorize_type == "suffix":
        add_path = file_path.suffix
    elif categorize_type == "cmonth":
        add_path = cdt.strftime("%Y-%m")
    else:
        print(f"categorize_type: {categorize_type}は存在しません")
        return None
    
    if add_path:
        return add_path
    else:
        return None

def main():
    config = get_config()
    if config is None:
        return

    # 必須項目のチェック
    from_dir = config.get("from")
    to_dir = config.get("to")
    if not from_dir or not to_dir:
        print("fromとtoは必須です。")
        return

    # 拡張子リストのドット除去をここで一括で行う
    valid_suffixes = [remove_dot(str(ext)) for ext in config.get("valid_suffixes", [])]
    ignore_suffixes = [remove_dot(str(ext)) for ext in config.get("ignore_suffixes", [])]
    
    from_path = Path(str(from_dir))
    to_path = Path(str(to_dir))

    categorize_type = config.get("categorize_type", None)
    if categorize_type == "":
        categorize_type = None

    if not from_path.is_absolute() or not to_path.is_absolute():
        print("toとfromには絶対パスを指定してください")
        return
    
    if not from_path.exists():
        print("移動対象のディレクトリが存在しません")
        return
    
    to_path.mkdir(parents=True, exist_ok=True)

    for file_path in from_path.iterdir():
        if file_path.is_file():
            # 現在のファイルの拡張子からドットを取り除く
            current_ext = remove_dot(file_path.suffix)
            
            add_path = get_categorize_path(file_path, categorize_type)
            if add_path:
                target_path = to_path / add_path
            else:
                target_path = to_path
            
            if is_valid_suffix(current_ext, valid_suffixes, ignore_suffixes):
                move_file(file_path, target_path)

def move_file(file_path, to_path):
    try:
        to_path.mkdir(parents=True, exist_ok=True)
        shutil.move(str(file_path), str(to_path / file_path.name))
        print(f"Moved: {file_path.name}")
    except Exception as e:
        print(f"Error moving {file_path.name}: {e}")

if __name__ == "__main__":
    main()
