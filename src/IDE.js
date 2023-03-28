import logo from './logocc.PNG';
import loadingLogo from './loading.png';
import AceEditor from "react-ace";
import './App.css';
import "ace-builds/src-noconflict/mode-powershell";
import "ace-builds/src-noconflict/mode-sh";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-php";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-terminal";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';
function App() {
  const [lang, setLang] = useState('python');
  const [theme, setTheme] = useState('monokai');
  const [cookies, setCookie] = useCookies();
  const [isRunning, setIsRunning] = useState(false)
  const [isAddNewFile, setIsAddNewFile] = useState(false);
  const [currFileName, setCurrFileName] = useState('default.py');
  const [isLangUpdated,setIsLangUpdated]=useState(true);
  const newFileName = useRef();
  const ThemesList =
    [
      'monokai',
      'idle_fingers',
      'ambiance',
      'clouds_midnight',
      'dracula',
      'one_dark',
      'textmate',
      'github',
      'tomorrow',
      'kuroir',
      'twilight',
      'xcode',
      'terminal'
    ]
  const LangList = [
    'c_cpp',
    'java',
    'python',
    'javascript'
  ]
  const [isFileList, setIsFileList] = useState(true);
  const [FileList, setFileList] = useState(['default.py'])
  useEffect(() => {
    console.log("in useeffect")
    
    // localStorage.removeItem('FileList')
    // setIsLangUpdated(false);
    if (localStorage.getItem('FileList')) {
      console.log("FileList", JSON.parse(localStorage.getItem("FileList")))
      setFileList(JSON.parse(localStorage.getItem("FileList")))
    } else {
      localStorage.setItem("FileList", JSON.stringify(FileList));
    }
    if (localStorage.getItem('currFileName')) {
      setCurrFileName(localStorage.getItem('currFileName'))
    } else {
      localStorage.setItem('currFileName', currFileName);
    }
    // setLang(cookies.lang?cookies.lang:'c_cpp');
    if (localStorage.getItem('lang')) {
      setLang(localStorage.getItem('lang'))
    } else {
      localStorage.setItem('lang', lang)
    }
    // setLang(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'c_cpp');
    // setTheme(cookies.theme?cookies.theme:'monokai');
    if (localStorage.getItem('theme')) {
      setLang(localStorage.getItem('theme'))
    } else {
      localStorage.setItem('theme', theme)
    }
    // setTheme(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'monokai');
    console.log("localStorage.lang", localStorage.getItem('lang'));
    console.log("localStorage.theme", localStorage.getItem('theme'));
    inpRef.current.value = (localStorage.getItem('input') ? localStorage.getItem('input') : '');
    opRef.current.value = (localStorage.getItem('output') ? localStorage.getItem('output') : '');
    
    setTimeout(() => {

      console.log(lang);
      console.log(theme);
      console.log('localStorage input', localStorage.getItem('input'));
      console.log('localStorage output', localStorage.getItem('output'));
      if (localStorage.getItem('currFileName') === 'default.py') {
        if(localStorage.getItem('lang')==null){
          localStorage.setItem(lang)
        }
        switch (localStorage.getItem('lang') ? localStorage.getItem('lang') : lang) {
          case 'c_cpp':
            codeRef.current.editor.setValue(localStorage.getItem('c_cpp') ? localStorage.getItem('c_cpp') : '')
            break;
          case 'python':
            codeRef.current.editor.setValue(localStorage.getItem('python') ? localStorage.getItem('python') : '')
            break;
          case 'java':
            codeRef.current.editor.setValue(localStorage.getItem('java') ? localStorage.getItem('java') : '')
            break;
          case 'javascript':
            codeRef.current.editor.setValue(localStorage.getItem('javascript') ? localStorage.getItem('javascript') : '')
            break;

          default:
            break;
        }
      } else {
        console.log("local storage buffer of" + localStorage.getItem('currFileName') + " is " + localStorage.getItem(localStorage.getItem('currFileName')))
        codeRef.current.editor.setValue(localStorage.getItem(localStorage.getItem('currFileName')) ? localStorage.getItem(localStorage.getItem('currFileName')) : '')
      }
      setIsLangUpdated(true);
      switchFile('default.py')
      console.log('currFileName', localStorage.getItem('currFileName'));
    }, 500)


    return () => {

    }
  }, [])
  const updateCode = () => {
    // setCookie(lang,codeRef.current.editor.getValue());
    if (currFileName === 'default.py') {
      console.log("lang ", lang)
      localStorage.setItem(lang, codeRef.current.editor.getValue())
      setTimeout(() => console.log(localStorage.getItem(lang)), 500)
      switch (lang) {
        case 'c_cpp':
          console.log(localStorage.getItem('c_cpp'))
          break;
        case 'python':
          console.log(localStorage.getItem('python'))
          break;
        case 'java':
          console.log(localStorage.getItem('java'))
          break;
        case 'javascript':
          console.log(localStorage.getItem('javascript'))
          break;

        default:
          break;
      }
    } else {
      console.log("currFileName", currFileName);
      console.log("update buffer : ", localStorage.getItem(currFileName));
      localStorage.setItem(currFileName, codeRef.current.editor.getValue())
    }

  }
  const changeLang = (e) => {
    setLang(e.target.value);
    console.log(e.target.value);
    // setCookie("lang",e.target.value);
    localStorage.setItem("lang", e.target.value);
    setTimeout(() => {
      switch (e.target.value) {
        case 'c_cpp':
          console.log("cookie ", localStorage.getItem("c_cpp"))
          codeRef.current.editor.setValue((localStorage.getItem("c_cpp")) ? (localStorage.getItem("c_cpp")) : (''))
          break;
        case 'python':
          console.log("cookie ", localStorage.getItem("python"))
          codeRef.current.editor.setValue((localStorage.getItem("python")) ? (localStorage.getItem("python")) : (''))
          break;
        case 'java':
          console.log("cookie ", localStorage.getItem("java"))
          codeRef.current.editor.setValue((localStorage.getItem("java")) ? (localStorage.getItem("java")) : (''))
          break;
        case 'javascript':
          console.log("cookie ", localStorage.getItem("javascript"))
          codeRef.current.editor.setValue((localStorage.getItem("javascript")) ? (localStorage.getItem("javascript")) : (''))
          break;

        default:
          break;

      }
      console.log(`language = ${lang}`)
    }, 500)

  }
  const changeTheme = (e) => {
    setTheme(e.target.value)
    // setCookie('theme', e.target.value)
    localStorage.setItem('theme', e.target.value)
    setTimeout(() => { console.log(`theme = ${e.target.value}`) }, 500)

  }
  const inpRef = useRef();
  const opRef = useRef();
  const codeRef = useRef();
  const tmRef = useRef();
  const memRef = useRef();
  const detectLanguage = (FileName) => {
    let extension = FileName.split('.')[1];
    console.log("extension == ", extension);
    if (extension == 'any') extension = lang
    switch (extension) {
      case 'c':
        return 'c'
        break;
      case 'cpp':
        return 'cpp14';
        break;
      case 'c_cpp':
        return 'cpp14'
        break;
      case 'java':
        return 'java'
        break;
      case 'py':
        return 'python3'
        break;
      case 'js':
        return 'nodejs'
        break;
      default:
        return lang
        break;
    }
  }

  const fetchOutput = () => {
    setIsRunning(true);
    console.log("going to fetch output")
    // console.log(codeRef.current.editor.getValue());
    // setCookie('input',inpRef.current.value);
    localStorage.setItem('input', inpRef.current.value);
    // const url = "https://api.jdoodle.com/v1/execute";
    const url = "https://aharnish-api.herokuapp.com/ide/execute"
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "user-agent": "Mozilla/5.0",
        "Access-Control-Allow-Origin": "http://localhost:3000"
      },
      body: JSON.stringify({
        "script": codeRef.current.editor.getValue(),
        "language": detectLanguage(currFileName),
        "versionIndex": "4",
        "clientId": "78c0225d0e066ae09dfc6d1ecdfbb5e1",
        "clientSecret": "e7b074922df8407301da11e9007982fee5cf7368bfc57cba77a802c0b3fcacea",
        "stdin": inpRef.current.value
      })
    }
    fetch(url, options)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        setIsRunning(false);
        localStorage.setItem('output', res.output);
        opRef.current.value = res.output;
        tmRef.current.value = res["cpuTime"];
        memRef.current.value = res.memory;
        // if (lang === 'java') {
        //   // setCookie('output',(res.stdout ? res.stdout : res.stderr))
        //   localStorage.setItem('output', res.stdout ? res.stdout : res.stderr)
        //   opRef.current.value = (res.stdout ? res.stdout : res.stderr);
        // }
        // else {
        //   // setCookie('output',res)
        //   localStorage.setItem('output',res);
        //   opRef.current.value = res;
        // }
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'auto'
          /* you can also use 'auto' behaviour 
             in place of 'smooth' */
        });
      })
      .catch(err => {
        setIsRunning(false);
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'auto'
          /* you can also use 'auto' behaviour 
             in place of 'smooth' */
        });
        console.log("error");
      })
  }
  const handleCreateFileSubmit = (e) => {
    e.preventDefault();
    let fileName = newFileName.current.value;
    console.log(fileName);
    const arrayOfTwo = fileName.split('.');
    console.log(arrayOfTwo);
    if (arrayOfTwo.length < 2) {
      alert('Please enter a valid file name with valid extension like : \n .c_cpp .cpp .c .java .py .js')
      return;
    }
    let ext = arrayOfTwo[1];
    if (ext === 'c' || ext == 'cpp') {
      ext = 'c_cpp';
    }
    if (ext !== 'c_cpp' && ext !== 'java' && ext !== 'py' && ext !== 'js') {
      alert('Please enter a valid file name with valid extension like : \n .c .c_cpp .cpp .java .py .js')
      return;
    }
    fileName = arrayOfTwo[0] + '.' + ext;
    FileList.push(fileName);
    setIsFileList(false);
    setIsAddNewFile(false);

    setTimeout(() => { setIsFileList(true); switchFile(fileName); console.log(FileList); setFileList(FileList); localStorage.setItem("FileList", JSON.stringify(FileList)); }, 500);

  }
  const deleteFile = (FileToBeDeleted) => {
    console.log('delete file clicked', FileToBeDeleted);
    setFileList(FileList.filter((FileName) => FileName !== FileToBeDeleted))
    setIsFileList(false);
    setTimeout(() => {
      setIsFileList(true);
      switchFile('default.py')
      console.log(FileList);
      localStorage.setItem("FileList", JSON.stringify(FileList));
    }, 500);
  }
  const switchFile = (FileToBeSwitched) => {
    console.log("switch file clicked", FileToBeSwitched);
    setCurrFileName(FileToBeSwitched);
    localStorage.setItem('currFileName', FileToBeSwitched);
    localStorage.setItem('ext', FileToBeSwitched.split('.')[1]);
    setTimeout(() => {
      if (localStorage.getItem('currFileName') === 'default.py') {
        console.log("lang in default.py", lang);
        switch (localStorage.getItem('lang')) {
          case 'c_cpp':
            console.log("cookie ", localStorage.getItem("c_cpp"))
            codeRef.current.editor.setValue((localStorage.getItem("c_cpp")) ? (localStorage.getItem("c_cpp")) : (''))
            break;
          case 'python':
            console.log("cookie ", localStorage.getItem("python"))
            codeRef.current.editor.setValue((localStorage.getItem("python")) ? (localStorage.getItem("python")) : (''))
            break;
          case 'java':
            console.log("cookie ", localStorage.getItem("java"))
            codeRef.current.editor.setValue((localStorage.getItem("java")) ? (localStorage.getItem("java")) : (''))
            break;
          case 'javascript':
            console.log("cookie ", localStorage.getItem("javascript"))
            codeRef.current.editor.setValue((localStorage.getItem("javascript")) ? (localStorage.getItem("javascript")) : (''))
            break;

          default:
            break;

        }
      } else {
        console.log("buffer ", localStorage.getItem(localStorage.getItem('currFileName')))
        codeRef.current.editor.setValue(localStorage.getItem(localStorage.getItem('currFileName')) ? localStorage.getItem(localStorage.getItem('currFileName')) : '')
      }
    }, 500)
  }
  const switchLang=(thisLang)=>{
    console.log(thisLang);
    setLang(thisLang);
    
    // setCookie("lang",e.target.value);
    localStorage.setItem("lang", thisLang);
    setTimeout(() => {
      switch (thisLang) {
        case 'c_cpp':
          console.log("cookie ", localStorage.getItem("c_cpp"))
          codeRef.current.editor.setValue((localStorage.getItem("c_cpp")) ? (localStorage.getItem("c_cpp")) : (''))
          break;
        case 'python':
          console.log("cookie ", localStorage.getItem("python"))
          codeRef.current.editor.setValue((localStorage.getItem("python")) ? (localStorage.getItem("python")) : (''))
          break;
        case 'java':
          console.log("cookie ", localStorage.getItem("java"))
          codeRef.current.editor.setValue((localStorage.getItem("java")) ? (localStorage.getItem("java")) : (''))
          break;
        case 'javascript':
          console.log("cookie ", localStorage.getItem("javascript"))
          codeRef.current.editor.setValue((localStorage.getItem("javascript")) ? (localStorage.getItem("javascript")) : (''))
          break;

        default:
          break;

      }
      console.log(`language = ${lang}`)
    }, 500)

    
  }
  const createNewFile = (e) => {
    let fileName = window.prompt("Enter file name : ")
    console.log(fileName)
    const arrayOfTwo = fileName.split('.');
    console.log(arrayOfTwo);
    if (arrayOfTwo.length < 2) {
      alert('Please enter a valid file name with valid extension like : \n .c_cpp .cpp .c .java .py .js')
      return;
    }
    let ext = arrayOfTwo[1];
    if (ext === 'c' || ext == 'cpp') {
      ext = 'c_cpp';
    }
    if (ext !== 'c_cpp' && ext !== 'java' && ext !== 'py' && ext !== 'js') {
      alert('Please enter a valid file name with valid extension like : \n .c .c_cpp .cpp .java .py .js')
      return;
    }
    fileName = arrayOfTwo[0] + '.' + ext;
    FileList.push(fileName);
    setIsFileList(false);
    setIsAddNewFile(false);
    if(ext=='c' || ext=='cpp' || ext=='c_cpp') switchLang('c_cpp')
    else if(ext=='java') switchLang('java')
    else if(ext=='py') switchLang('python')
    else {
      window.alert('not a valid language')
    }
    setTimeout(() => {
      setIsFileList(true); switchFile(fileName); console.log(FileList); setFileList(FileList); localStorage.setItem("FileList", JSON.stringify(FileList));
      localStorage.setItem("FileList", JSON.stringify(FileList));
    }, 500);

  }
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className='topnav'>
            <img src={logo} className="App-logo" alt="logo" />
            <span className="titleHead">Om's Online Ide</span>

            {
              (false) ?
                <select className="lang" onChange={changeLang}>
                  {
                    (currFileName) ?
                      <option id="currentFileName">{currFileName}</option> :
                      null
                  }
                  {
                    LangList.map((LangName) => {

                      return (
                        (localStorage.getItem('lang') !== LangName && lang !== LangName) ?
                          <option id={LangName}>{LangName}</option> :
                          null
                      )
                    })
                  }

                </select>
                :
                <button className='lang'>{currFileName.split('.')[1]}</button>
            }
            <select className="files">

              {
                (isFileList) ?
                <>
                  {
                  (currFileName) ?
                    <option id="currentFile">{currFileName}</option> :
                    <option id="currentFile">default.py</option>
                  }
                  {
                    FileList.map((FileName) => {
                      return (
                        // <option className="elemNav">
                        (currFileName == FileName || currFileName=="default.py") ?
                        null : <option style={{ "float": "left", "width": "70%" }} className={(currFileName === FileName) ? ("activeClass") : ("fileClass")} onClick={() => switchFile(FileName)} disabled={FileName === currFileName}>{FileName}</option>
                      )
                    }) 
                  }
                  
                  </>
                  :
              null
              }
            </select>

            <select className="theme" onChange={changeTheme}>
              {
                (localStorage.getItem('theme')) ?
                  <option id="currentTheme">{localStorage.getItem('theme')}</option> :
                  null
              }
              {/* <div className="scrollDiv"> */}
              {
                ThemesList.map((ThemeName) => {
                  return (
                    (localStorage.getItem('theme') !== ThemeName) ?
                      <option id={ThemeName}>{ThemeName}</option> :
                      null
                  )
                })
              }

              {/* </div> */}


            </select>

            {
              isRunning ?

                <span>
                  <img src={loadingLogo} alt="" className="loadingLogo" />
                  Running ....
                </span> :
                <button className="run" onClick={fetchOutput}>
                  Run Code
                </button>
            }
            <button className="addFileClass" onClick={createNewFile}> add new file </button>
            {/* {
                  isAddNewFile ?
                      <form className="addNewFileForm" onSubmit={handleCreateFileSubmit}>
                        <input type="text" placeholder={`filename.ext`} ref={newFileName} />
                        <button onClick={(e)=>{e.preventDefault();setIsAddNewFile(false);console.log(newFileName.current.value)}}>X</button>
                      </form>
                    :
                    null
              } */}
          </div>
        </div>
      </div>
      <div className='editorclass'>
        {
          isLangUpdated?
          <AceEditor
          ref={codeRef}
          onChange={updateCode}
          mode={lang}
          theme={theme}
          name="kdslfadsf"
          editorProps={{ $blockScrolling: true }}
          width="100%"
          style={{ "float": "left" }}
          fontSize="1.8vw"
          height="44vw"
        />
          :
          <h1>"Loading ....."</h1>
        }
        
      </div>
      <div className="container">
        <div className="container">
          <div>
            {
              isRunning ?
                <span>
                  <img src={loadingLogo} alt="" className="loadingLogo" />
                  Running ....
                </span> :
                <button className="run" onClick={fetchOutput}>
                  Run Code
                </button>
            }
          </div>
        </div>
        <div className="container">
          <div className="inp" >
            <h4>Input:</h4>
            <textarea ref={inpRef} id="inpText" className="inpText" placeholder="write default input here...">

            </textarea>
          </div>
          <div className="Op">
            <h4> Output:</h4>
            <textarea ref={opRef} placeholder="output will be displayed here.." className="opText">

            </textarea>
          </div>
          <div className="Op">
            <h4> Time:</h4>
            <textarea ref={tmRef} placeholder="CPU run time will be displayed here.." className="opText">

            </textarea>
          </div>
          <div className="Op">
            <h4> memory:</h4>
            <textarea ref={memRef} placeholder="CPU Memory usage will be displayed here.." className="opText">

            </textarea>
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;