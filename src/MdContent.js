import React from 'react';
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import "./App.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, Container } from 'react-bootstrap';
// import { LoginContext, UserContext } from "./App";
// import { useNavigate } from "react-router-dom";
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';

const themes = {
    atomDark,
    dark,
};

export default function MdContent({ data , showThemeOption }) {
    const [theme, setTheme] = useState("atomDark");
    return (
        <Container>
            <Card className='border-0'>
                
                <ReactMarkdown
                    children={data}
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");
                            return !inline && match ? (
                                <SyntaxHighlighter
                                    children={String(children).replace(/\n$/, "")}
                                    style={themes[theme]}
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
                {
                    showThemeOption && 
                        <div className="form-group">
                        <label htmlFor="theme-select">Select Theme:</label>
                        <select
                            className="form-control"
                            id="theme-select"
                            onChange={(event) => setTheme(event.target.value)}
                            value={theme}
                        >
                            {Object.keys(themes).map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            ))}
                        </select>
                    </div>
                }
                
            </Card>
        </Container>
    )
}
