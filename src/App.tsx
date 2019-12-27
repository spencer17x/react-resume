import React, { useEffect, useState } from 'react';
import './reset.css';
import ResumeEditor from './components/ResumeEditor';
import StyleEditor from './components/StyleEditor';

const App: React.FC = () => {
	const [interval] = useState(40);
	const [currentStyle, setCurrentStyle] = useState('');
	const [enableHtml, setEnableHtml] = useState(false);
	const [fullStyle] = useState([
		`/*
* Inspired by http://strml.net/
* 大家好，我是17
* 热于追求技术
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


`,
		`
/* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`
		,
		`
/* 再对 HTML 加点样式 */
.resumeEditor{
  padding: 2em;
}
.resumeEditor h2{
  display: inline-block;
  border-bottom: 1px solid;
  margin: 1em 0 .5em;
}
.resumeEditor ul,.resumeEditor ol{
  list-style: none;
}
.resumeEditor ul> li::before{
  content: '•';
  margin-right: .5em;
}
.resumeEditor ol {
  counter-reset: section;
}
.resumeEditor ol li::before {
  counter-increment: section;
  content: counters(section, ".") " ";
  margin-right: .5em;
}
.resumeEditor blockquote {
  margin: 1em;
  padding: .5em;
  background: #ddd;
}
`
	]);
	const [currentMarkdown, setCurrentMarkdown] = useState('');
	const [fullMarkdown] = useState(`17
----

前端工程师，坐标杭州

技能
----

* React.js
* Vue.js
* TypeScript
* Taro
* 微信小程序开发

工作经历
----

于18年毕业
第一家公司实习3个月
第二家公司9月初至今

个人简介及链接
----

给 Taro 贡献过代码

* [GitHub](https://github.com/xuzpeng)
* [我的Blog](https://xuzpeng.github.io/)
* [我的个人开源项目](https://github.com/xuzpeng/fiona-ui)

> 如果你喜欢这个效果，Fork [我的项目](https://github.com/xuzpeng/react-resume)，打造你自己的简历！

`);
	const progressivelyShowResume = () => {
		return new Promise((resolve, reject) => {
			let length = fullMarkdown.length;
			let showResume = () => {
				if (currentMarkdown.length < length) {
					setCurrentMarkdown(fullMarkdown.substring(0, currentMarkdown.length + 1));
				} else {
					resolve();
				}
			};
			setTimeout(showResume, interval);
		});
	};
	const showHtml = function () {
		return new Promise((resolve, reject) => {
			setEnableHtml(true);
			resolve();
		});
	};
	const makeResume = async function () {
		await progressivelyShowStyle(0);
		await progressivelyShowResume();
		await progressivelyShowStyle(1);
		await showHtml();
		await progressivelyShowStyle(2);
	};
	const progressivelyShowStyle = function (n: number) {
		return new Promise((resolve, reject) => {
			let showStyle = (async function () {
				let style = fullStyle[n];
				if (!style) {
					return;
				}
				// 计算前 n 个 style 的字符总数
				let length = fullStyle
				.filter((_, index) => index <= n)
				.map((item) => item.length)
				.reduce((p, c) => p + c, 0);
				let prefixLength = length - style.length;
				if (currentStyle.length < length) {
					let l = currentStyle.length - prefixLength;
					let char = style.substring(l, l + 1) || ' ';
					setCurrentStyle(currentStyle + char);
				} else {
					resolve();
				}
			});
			setTimeout(showStyle, interval);
		});
	};
	useEffect(() => {
		makeResume();
	});
	return (
		<div className="App">
			<StyleEditor code={currentStyle} />
			<ResumeEditor markdown={currentMarkdown} enableHtml={enableHtml} />
		</div>
	);
};

export default App;
