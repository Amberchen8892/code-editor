import { useRef, useEffect } from "react";
import './preview.css';
interface PreviewProps {
  code: string;
  bundlingStatus: string
}

const html = `
    <html>
        <head>
            <style>
                html {
                    background-color: white
                }
            </style>
        </head>
        <body>
            <div id="root" ></div>
            <script>
            const handleErr = (err) => {
                const root = document.querySelector('#root');
                root.innerHTML = '<div style="color:red"><h4>Runtime Error</h4>' + err + '</div>'
            }
            window.addEventListener('error', (event) => {
                event.preventDefault();
                handleErr(event.error);
            })
            window.addEventListener('message',(event) => {
                try { 
                    eval(event.data)
                } catch (err){
                   handleErr(err);
                }
               
            }, false)
            </script>
        </body>
    </html>
    
    `;
const Preview: React.FC<PreviewProps> = ({ code,bundlingStatus }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, "*");
    },50)
  }, [code]);
  return (
    <div className="preview-wrapper">
    <iframe ref={iframe} sandbox="allow-scripts" title="iframe" srcDoc={html} />
    {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  );
};
export default Preview;
