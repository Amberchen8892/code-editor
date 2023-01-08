import { useState } from "react";
import Bundle from "../bundler/index";
import CodeEditor from "./code-editor";
import Preview from "./preview";
//import Resizable from "./resizeable";
const CodeCell = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");

  const onSubmit = async () => {
    const output = await Bundle(input);
    setCode(output);
  };

  return (
    //<Resizable direction='vertical'>
      <div>
        <CodeEditor
          initialValue="const a=1;"
          onChange={(value) => setInput(value)}
        />
        <div>
          <button onClick={onSubmit}>Submit</button>
        </div>
        <Preview code={code} />
      </div>
    //</Resizable>
  );
};

export default CodeCell;
