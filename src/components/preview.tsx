import {useRef, useEffect} from 'react';
interface PreviewProps {
    code : string
}

const html = `
    <html>
        <head></head>
        <body>
            <div id="root" ></div>
            <script>
            window.addEventListener('message',(event) => {
                try { 
                    eval(event.data)
                } catch (err){
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div>' + err + '</div>'
                }
               
            }, false)
            </script>
        </body>
    </html>
    
    `;
const Preview: React.FC<PreviewProps>= ({code}) => {
    const iframe = useRef<any>();
    useEffect(() => {
        iframe.current.srcdoc = html;
        // setCode(result.outputFiles[0].text);
    iframe.current.contentWindow.postMessage(code, "*");
    },[code])
    return <iframe  ref={iframe}
    sandbox="allow-scripts"
    title="iframe"
    srcDoc={html}/>
}
export default Preview;