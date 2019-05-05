import React, {useEffect, useRef} from 'react';
import marked from 'marked';

interface IProps {
  markdown: string;
  enableHtml: boolean;
}

const ResumeEditor: React.FC<IProps> = (props) => {
  const container = useRef(null);
  const goBottom: () => void = () => {
    (container.current! as HTMLDivElement).scrollTop = 100000;
  };
  useEffect(() => {
    goBottom();
  });

  return (
    //@ts-ignore
    <div className={['resumeEditor', props.enableHtml ? 'htmlMode' : ''].filter(Boolean).join(' ')} ref={container}>
      {props.enableHtml ?
        <div dangerouslySetInnerHTML={{__html: props.enableHtml ? marked(props.markdown) : props.markdown}}></div> :
        <pre>{props.enableHtml ? marked(props.markdown) : props.markdown}</pre>}
    </div>
  )
}

export default ResumeEditor;