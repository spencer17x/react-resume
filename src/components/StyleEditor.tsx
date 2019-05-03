import React, {useEffect, useRef} from 'react';
//@ts-ignore
import Prism from 'prismjs';

interface IProps {
  ref?: object;
  code?: string;
}

const StyleEditor: React.FC<IProps> = (props) => {
  const container = useRef(null);
  const highlightedCode = function () {
    return Prism.highlight(props.code, Prism.languages.css)
  };
  const goBottom = () => {
    // container.scrollTop = 100000
  }
  return (
    <div className="styleEditor" ref={container}>
      <div className="code" dangerouslySetInnerHTML={{__html: `<style>${props.code}</style>`}}/>
      <pre className="" dangerouslySetInnerHTML={{__html: Prism.highlight(props.code, Prism.languages.css)}}></pre>
    </div>
  )
}

export default StyleEditor;