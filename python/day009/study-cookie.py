from http.server import HTTPServer, BaseHTTPRequestHandler
from http.cookies import SimpleCookie
import urllib.parse

def create_html(body):
  return f"""
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cookie Test</title>
  </head>
  <script>
    <!-- pythonのf-stringでは{{ と書くことで通常のカッコとなる -->

    function login() {{
      const name = document.getElementById("nameInput").value;
      if (!name) return;
      fetch("/login", {{
        method: "POST",
        body: new URLSearchParams({{ username: name }}),
      }}).then(() => location.reload());
    }}
    
    function logout() {{
      fetch("/logout", {{
        method: "POST",
      }}).then(() => location.reload());
    }}
  </script>
  <body>{body}</body>
</html>

"""

class CookieDemoHandler(BaseHTTPRequestHandler):
  def do_GET(self):
    # get cookie from http header
    cookie = SimpleCookie(self.headers.get("Cookie"))

    # get data from cookie
    username_morsel = cookie.get("username")
    username = username_morsel.value if username_morsel is not None else None
    
    # set response deader
    # success code
    self.send_response(200)
    # set content type as html
    self.send_header("Content-type", "text/html; charset=utf-8")
    # 空行を入れてヘッダーが終わることを伝える
    self.end_headers()

    # httpのボディとなるhtmlを作成
    if username:
      body = f"<div>You logged in as {username}</div>"
      body += "<button onclick='logout()'>ログアウト</button>"
    else:
      body = """
<div>login page</div>
<input type='text' id='nameInput' placeholder='名前を入力' />
<button onclick='login()'>ログイン</button>
"""

    html = create_html(body)

    # httpのボディにhtmlをセット
    self.wfile.write(html.encode("utf-8"))

  def do_POST(self):
    # ヘッダーからContent-Lengthを取得して、intにパース。何バイトデータを読み込めばいいかを判断する用
    content_length = int(self.headers["Content-Length"])
    # content_lengthの値をもとにデータバイナリを読み込んで、utf-8にデコード
    post_data = self.rfile.read(content_length).decode("utf-8")

    # 取得したデータ文字列をプログラムで扱いやすいようにオブジェクト形式に変換
    # html側が body: new URLSearchParams({ username: name }) を使っているから動く。
    # body: JSON.stringify({ username: name })（Json）の場合は
    # params = json.loads(postdata)にする必要がある
    params = urllib.parse.parse_qs(post_data)

    # レスポンスヘッダーを指定。
    # ポスト成功のコード
    self.send_response(200)

    # ヘッダーのpathをもとに処理を分岐
    if self.path == "/login":
      # クッキーに残すためのデータをurlパラメータからデータを取得
      # 配列形式になっているのは、同じキーで送られてきたときにデータの損失をなくすためにこの構造が採用されているから
      # html側がjson形式で送ってきている場合はjson.loadsでパース済みなので
      # username = params.get("username")としてオブジェクトとして扱う
      username = params.get("username", [""])[0]

      cookie= SimpleCookie()
      # usernameというクッキーのキーを追加
      # Set-Cookie: username="username"; path=/; max-age=3600 
      cookie["username"] = username
      cookie["username"]["path"] = "/"
      cookie["username"]["max-age"] = 3600
      # send_headerで既に指定されているのに、cookie.outputは自動でSet-Cookieをつけてしまうので、header=""でつけないようにする。
      self.send_header("Set-Cookie", cookie.output(header=""))

    elif self.path == "/logout":
      cookie = SimpleCookie()
      cookie["username"]=""
      cookie["username"]["path"] = "/"
      # ブラウザにクッキーを削除させたい場合はmax-ageを0に指定する
      # name以外にもpathやdomainが一致していないと消せない。
      cookie["username"]["max-age"] = 0
      self.send_header("Set-Cookie", cookie.output(header=""))
    
    # 空行を挿入して、ヘッダーが終わりであることを伝える
    self.end_headers()
    # ボディにバイナリでOKと書き込む。通信にそのまま使えるバイナリに変換するためにbをつける
    self.wfile.write(b"OK")


if __name__ == "__main__":
  server = HTTPServer(("localhost", 8000), CookieDemoHandler)
  print("Server started at http://localhost:8000")
  server.serve_forever()

