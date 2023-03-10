import { useState, useEffect } from "react";
import Bundle from "../bundler/index";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
const CodeCell = () => {
  const [code, setCode] = useState("");
  const [err, setErr] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(async() => {
      const output = await Bundle(input);
    setCode(output.code);
    setErr(output.err);

    },1000)
    return () => {
      clearTimeout(timer)
    }
  },[input])

  return (
    <Resizable direction='vertical'>
      <div style={{height:"100%", display:"flex", flexDirection:"row"}}>
      <Resizable direction='horizontal'>
        <CodeEditor
          initialValue="const a=1;"
          onChange={(value) => setInput(value)}
        />
        </Resizable>
        <Preview code={code} bundlingStatus={err} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
