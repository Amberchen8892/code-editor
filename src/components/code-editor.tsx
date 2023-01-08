import {useRef} from 'react';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import prettier from "prettier";
import parser from "prettier/parser-babel";
import './CodeEditor.css';
//import codeShift from 'jscodeshift';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';
import {parse} from '@babel/parser';
import traverse from '@babel/traverse';
//import './syntax.css';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}
const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();
  const onEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.onDidChangeModelContent(() => {
      onChange(editor.getValue());
    });
 
    editor.getModel()?.updateOptions({ tabSize: 2 });
    const highlighter = new MonacoJSXHighlighter(
      // @ts-ignore
      window.monaco,parse,traverse,editor)
 
 
      highlighter.highlightOnDidChangeModelContent();
  };
 
  const onFormatClick = () => {
    // console.log(editorRef.current)
    const unformatted = editorRef.current.getModel().getValue();
 
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true,
    }).replace(/\n$/,"");
    console.log(formatted);
    editorRef.current.setValue(formatted);
  };
  return (
    <div className='editor-wrapper'>
      <button className='button button-format is-primary is-small' onClick={onFormatClick}>
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        onMount={onEditorDidMount}
        language='javascript'
        height='500px'
        theme='vs-dark'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: true,
          lineNumbersMinChars: 3,
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};
 
export default CodeEditor;