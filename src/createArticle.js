// import ReactMarkdown from "react-markdown";
import { useRef, useState, useContext, useEffect } from "react";
import "./App.css";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
// import { SpellCheckInput } from 'react-input-enhancements';
import { LoginContext, UserContext } from "./App";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import MdContent from "./MdContent";

const themes = {
  atomDark,
  dark,
};

function CreateArticle() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(LoginContext);
  const [userId,setUserId]=useState();
  const [userName,setUserName]=useState();
  const [articleName, setArticleName] = useState("");
  const [data, setData] = useState("");
  
  // const [theme, setTheme] = useState("atomDark");
  const articleNameRef = useRef(null);
  const tagsRef = useRef(null);
  const difficultyRef = useRef(null);
  const summaryRef=useRef(null);


  useEffect(() => {
    if (!localStorage.getItem('userName')) {
      navigate('/login');
    }else{
      setUserName(localStorage.getItem('userName'));
      setUserId(localStorage.getItem('userId'));
      console.log("userId : ",localStorage.getItem('userId'));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const articleName = articleNameRef.current.value;
    console.log("Tags: ", tagsRef.current.value);
    console.log("Difficulty: ", difficultyRef.current.value);
    let tags = tagsRef.current.value;
    let difficulty = difficultyRef.current.value;
    const summary=summaryRef.current.value;
    if (!tags) tags = "";
    if (!difficulty) difficulty = "normal";
    tags = tags.split(",");
    console.log("tags : ", tags);
    console.log("difficutly : ", difficulty);
    console.log("userName : ",userName,localStorage.getItem('userName'));
    fetch(`/articles/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        creatorId: userId,
        creatorName: userName,
        content: data,
        name: articleName,
        tags: tags,
        difficutly: difficulty,
        summary:summary
      })
    }).then((response) => response.json())
      .then((response) => {
        // console.log(response);
        if (response.error) {
          throw response.error;
        } else {
          console.log("article created successfully");
          alert("article created successfully");
          const article = response.article;
          navigate(`/article/${article.name}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-5">
      {/* <div className="form-group">
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
      </div> */}

      <div className="form-group">
        <label htmlFor="article-title">Article Title:</label>
        <input
          type="text"
          className="form-control"
          id="article-title"
          spellcheck={true}
          onChange={(e) => setArticleName(e.target.value)}
        />
        {/* <SpellCheckInput
          value={articleName}
          onChange={(e) => setArticleName(e.target.value)}
        /> */}
      </div>

      <Form.Group controlId="formDifficulty">
        <Form.Label>Difficulty</Form.Label>
        <Form.Control as="select" ref={difficultyRef}>
          <option>Easy</option>
          <option>Normal</option>
          <option>Medium</option>
          <option>Hard</option>
          <option>Expert</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formTags">
        <Form.Label>Tags ( comma sperated ) </Form.Label>
        <InputGroup>
          <Form.Control type="text" ref={tagsRef} />
        </InputGroup>
      </Form.Group>

      <div className="form-group">
        <label htmlFor="article-content">Article Content:</label>
        <textarea
          className="form-control"
          id="article-content"
          rows="10"
          spellCheck="true"
          onChange={(e) => setData(e.target.value)}
        ></textarea>
      </div>

      <div className="card">
        <div className="card-header">{articleName}</div>
        <div className="card-body p-3">
          <MdContent data={data} />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary</label>
          <textarea
            className="form-control"
            id="summary"
            rows="5"
            placeholder="Enter a brief summary of the article"
            ref={summaryRef}
          />
        </div>

      </div>


      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );

}

export default CreateArticle;
