import React, {useEffect, useState} from 'react';
import './reset.css';
//@ts-ignore
import Prism from 'prismjs';

const App: React.FC = () => {
  const [fullStyle] = useState(`/*
* Inspired by http://strml.net/
* 大家好，我是徐泽鹏
* 好多公司都在招聘，你是不是也在准备简历呀。
* 说做就做，我也来写一份简历！
*/

/* 首先给所有元素加上过渡效果 */
* {
  transition: all .3s;
}
/* 白色背景太单调了，我们来点背景 */
html {
  color: rgb(222,222,222); background: rgb(0,43,54);
}
/* 文字离边框太近了 */
.styleEditor {
  padding: .5em;
  border: 1px solid;
  margin: .5em;
  overflow: auto;
  width: 45vw; height: 90vh;
}
/* 代码高亮 */
.token.selector{ color: rgb(133,153,0); }
.token.property{ color: rgb(187,137,0); }
.token.punctuation{ color: yellow; }
.token.function{ color: rgb(42,161,152); }

/* 加点 3D 效果呗 */
html{
  perspective: 1000px;
}
.styleEditor {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
          transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.resumeEditor{
  position: fixed; right: 0; top: 0;
  padding: .5em;  margin: .5em;
  width: 48vw; height: 90vh;
  border: 1px solid;
  background: white; color: #222;
  overflow: auto;
}
/* 好了，我开始写简历了 */
`);
  const [currentStyle, setCurrentStyle] = useState('');
  useEffect(() => {
    const index = currentStyle.length;
    const text = fullStyle.substring(index, index + 1);
    if (currentStyle.length === fullStyle.length) {
      return;
    }
    setTimeout(() => {
      setCurrentStyle(currentStyle + text);
    }, 40);
  });
  return (
    <div className="App" >
      <div className="styleEditor">
        <div className="code" dangerouslySetInnerHTML={{__html: `<style>${currentStyle}</style>`}}></div>
        <pre  dangerouslySetInnerHTML={{__html: Prism.highlight(currentStyle, Prism.languages.css)}}></pre>
        {/*<pre>{currentStyle}</pre>*/}
      </div>
    </div>
  );
}

export default App;
