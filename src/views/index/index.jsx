import React, { useEffect, useState, useRef } from "react";
import Excalidraw, {
  // exportToCanvas,
  // exportToSvg,
  // exportToBlob,
  languages,
} from "@excalidraw/excalidraw";
import { Icon } from 'react-kui';
import initialData from "../../common/initialData";
import "./index.css";

const renderTopRightUI = (theme, grid, view, {
  onLanguage, // 设置语言
  setTheme, // 设置主题
  setGrid, // 设置网格
  setView, // 设置视图模式
  setZen, // 禅模式
}) => {
  return (
    <div 
      className="excalidraw_top-right_wrap"
      >
      <div>
       <select 
        defaultValue={navigator.language}
        className="excalidraw_top-right_select"
        onChange={(e) => {
          onLanguage(e.target.value);
        }}
      >
        {
          languages.map(item => {
            return (
              <option key={item.code} value={item.code}>{item.label}</option>
            );
          })
        }
      </select>
      <button className="excalidraw_top-right_button" onClick={() => window.open("https://excalidraw.com/", "_blank")}>
        excalidraw
      </button>
      </div>
      <div className="excalidraw_top-right_function">
        <div onClick={() => {setView()}}>
          {
            view ? <Icon type="eye" size="18" /> : <Icon type="eye-outline" size="18" />
          }
        </div>
        <div onClick={() => {setTheme()}}>
          {
            theme === 'light' ? <Icon type="contrast-outline" size="18" />
            : <Icon type="contrast" size="18"/>
          }
        </div>
        {/* <div onClick={() => {setZen()}}>
          <Icon type="code-outline" size="18" />
        </div> */}
        <div onClick={() => {setGrid()}}>
          {
            grid ? <Icon type="grid" size="18" /> : <Icon type="grid-outline" size="18" />
          }
        </div>
      </div>
    </div>
  );
};

const renderFooter = () => {
  return (<></>);
};

export default function Index() {
  const excalidrawRef = useRef(null);
  // 设置视图模式
  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  // 设置禅模式
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  // 设置网格模式
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  // 设置主题
  const [theme, setTheme] = useState("light");
  // 语言设置
  const [lang, setLang] = useState(navigator.language);


  useEffect(() => {
    const onHashChange = () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const libraryUrl = hash.get("addLibrary");
      if (libraryUrl) {
        excalidrawRef.current.importLibrary(libraryUrl, hash.get("token"));
      }
    };
    window.addEventListener("hashchange", onHashChange, false);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);
  useEffect(() => {
    console.log('感谢的Excalidraw和React KUI的支持！');
    console.log('author: bearxz & github:https://github.com/bearxz! ');
  }, []);
  return (
    <div className="App">
        <div className="excalidraw-wrapper">
          <Excalidraw
            ref={excalidrawRef}
            initialData={initialData}
            onLibraryChange={() => {console.log('hello woeld')}}
            viewModeEnabled={viewModeEnabled}
            zenModeEnabled={zenModeEnabled}
            gridModeEnabled={gridModeEnabled}
            theme={theme}
            name="Custom name of drawing"
            UIOptions={{ canvasActions: { 
              loadScene: true,
              theme: true,
            } }}
            renderTopRightUI={() => renderTopRightUI(
              theme,
              gridModeEnabled,
              viewModeEnabled,
              {
                onLanguage: (lang) => setLang(lang),
                setTheme: () => { theme === 'light' ? setTheme('dark') : setTheme('light')},
                setGrid: () => setGridModeEnabled(!gridModeEnabled),
                setView: () => setViewModeEnabled(!viewModeEnabled),
                setZen: () => setZenModeEnabled(!zenModeEnabled),
              }
            )}
            renderFooter={renderFooter}
            langCode={lang}
            autoFocus={true}
            detectScroll={true}
          />
        </div>
    </div>
  );
}
