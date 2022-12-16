// import logo from './logo.svg';
import ReactMarkdown from "react-markdown";
import { useRef, useState } from "react";
// import Markdown from 'marked-react';
// import gfm from 'remark-gfm'
import "./App.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
function App() {
  // const data=`~~~javascript
  //   var a=10;
  //   console.log("hello world");
  //   `;
  const [data, setData] = useState("");
  return (
    <div className="App">
      <textarea
        style={{
          "width":"100%",
          "fontSize":"20px"
          
        }}
        type="text"
        onChange={(e) => setData(e.target.value)}
      ></textarea>

      <ReactMarkdown
        children={data}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={atomDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      ></ReactMarkdown>
    </div>
  );
}

export default App;
