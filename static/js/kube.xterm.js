$(function () {
  Terminal.applyAddon(fullscreen);
  Terminal.applyAddon(fit);
  Terminal.applyAddon(webLinks);
  Terminal.applyAddon(search);
  Terminal.applyAddon(attach);

  // 新建一个Terminal实例
  var term = new Terminal({
    rendererType: "canvas", // 渲染类型
    convertEol: true,       // 启用时，光标将设置为下一行的开头
    scrollback: 10,         // 终端中的回滚量
    screenKeys: true,
    disableStdin: false,    // 是否应禁用输入。
    cursorBlink: true,      // 光标闪烁
    macOptionIsMeta: true,
  });

  // 打开一个会话窗口(初始化大小在Terminal实例配置)
  term.open(document.getElementById('terminal'));
  term.fit();

  // 新建一个WebSocket连接
  var websocket = new WebSocket("ws://" + window.location.host + window.location.pathname);
  websocket.binaryType = "arraybuffer";

  function TermRuning() {
    if (term._initialized) {
      return;
    }

    term._initialized = true;
    term.toggleFullScreen(true);

    term.prompt = () => {
        term.write('\r\n');
    };

    // 登录信息
    term.writeln(' へ　　　　　／|');
    term.writeln('　　/＼7　　　 ∠＿/');
    term.writeln('　 /　│　　 ／　／');
    term.writeln('　│　Z ＿,＜　／　　 /`ヽ');
    term.writeln('　│　　　　　ヽ　　 /　　〉');
    term.writeln('　 Y　　　　　`　 /　　/');
    term.writeln('　●　　●　　〈　　/');
    term.writeln('　()　 へ　　　　|　＼〈');
    term.writeln('　　> _　 ィ　 │ ／／');
    term.writeln('　 / へ　　 /　＜| ＼＼');
    term.writeln('　 ヽ_　　(_／　 │／／');
    term.writeln('　　7　　　　　　　|／');
    term.writeln('　　＞―r￣￣`―＿ /');
    term.writeln('');

    // 发送
    websocket.onopen = function () {
      console.log('websocket is open......');
      term.on('data', function (data) {
        websocket.send(data);
      });
    };
    // 错误
    websocket.onerror = function (event) {
      console.log('websocket is error:' + event);
    };
    // 返回
    websocket.onmessage = function(event) {
      term.write(event.data);
    };
    // 在关闭页面时弹出确认提示窗口；在刷新页面时，也会弹出确认提示窗口(待优化)
    window.onbeforeunload = function(event){
      // 关闭
      websocket.onclose = function(evt) {
        console.log("websocket is close......");
      };
      return '您可能有数据没有保存......';
    };
  }
  TermRuning();
});