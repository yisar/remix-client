import "./app.css";
import { useState, useTransition, Suspense } from "react";
import GlobalLoader from "./GlobalLoader.jsx";
import { lazy } from "react";
import { loader as UnoR } from './pages/uno.jsx'
import { loader as DocR } from './pages/doc.jsx'
import { loader as TiesR } from './pages/ties.jsx'
import { Route, Routes, useNavigate } from 'react-router-dom';

const pages = [
  {
    name:'Uno',
    path: '/',
    comp: lazy(() => import("./pages/uno.jsx")),
    loader: UnoR
  },
  {
    name:'Doc',
    path: '/doc',
    comp: lazy(() => import("./pages/doc.jsx")),
    loader: DocR
  },
  {
    name:'Ties',
    path: '/ties',
    comp: lazy(() => import("./pages/ties.jsx")),
    loader: TiesR
  }
]

import { fetchData } from "./fetchData.js";
const initialResource = fetchData(UnoR);

export default function App() {
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  function handleClick(index) {
    startTransition(() => {
      setResource(fetchData(pages[index].loader));
      navigate(pages[index].path)
    });
  }

  return (
    <>
      <GlobalLoader isLoading={isPending} />
      <ul className="inline">
        {pages.map((item, index) => <li
          className={location.pathname === item.path ? "selected" : null}
          onClick={() => handleClick(index)}
        >
          {item.name}
        </li>)}
      </ul>
      <div className={`tab ${isPending ? "pending" : null}`}>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            {pages.map(item => <Route path={item.path} element={<item.comp resource={resource} />} key={item.path}></Route>)}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}