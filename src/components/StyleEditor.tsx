import React, {useEffect, useRef} from 'react';
import Prism from 'prismjs';

interface IProps {
  code: string;
}

const StyleEditor: React.FC<IProps> = (props) => {
  const container = useRef(null);
  const goBottom: () => void = () => {
    (container.current! as HTMLDivElement).scrollTop = 100000;
  };
  useEffect(() => {
    goBottom();
  });
  return (
    <div className="styleEditor" ref={container}>
      <div className="code" dangerouslySetInnerHTML={{__html: `<style>${props.code}</style>`}}/>
      <pre className="" dangerouslySetInnerHTML={{__html: Prism.highlight(props.code, Prism.languages.css, 'javascript')}}></pre>
    </div>
  )
}

export default StyleEditor;