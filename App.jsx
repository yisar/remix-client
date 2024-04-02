import "./app.css";
import { useState, useTransition, Suspense } from "react";
import GlobalLoader from "./GlobalLoader.jsx";
import Loader from "./Loader.jsx";
import { lazy } from "react";

import { loader as UnoR } from './pages/uno.jsx'
import { loader as DocR } from './pages/doc.jsx'
import { loader as TiesR } from './pages/ties.jsx'

const pages = [
  {
    comp: lazy(() => import("./pages/uno.jsx")),
    loader: UnoR
  },
  {
    comp: lazy(() => import("./pages/doc.jsx")),
    loader: DocR
  },
  {
    comp: lazy(() => import("./pages/ties.jsx")),
    loader: TiesR
  }
]

import { fetchData } from "./fetchData.js";
const initialResource = fetchData(UnoR);

export default function App() {
  const [tab, setTab] = useState(0);
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  function handleClick(index) {
    const newRes = fetchData(pages[index].loader)
    startTransition(() => {
      setTab(index);
      setResource(newRes);
    });
  }

  const Comp = pages[tab].comp

  console.log(Comp)

  return (
    <>
      <GlobalLoader isLoading={isPending} />
      <ul className="inline">
        <li
          className={tab === 0 ? "selected" : null}
          onClick={() => handleClick(0)}
        >
          Uno
        </li>
        <li
          className={tab === 1 ? "selected" : null}
          onClick={() => handleClick(1)}
        >
          Dos
        </li>
        <li
          className={tab === 2 ? "selected" : null}
          onClick={() => handleClick(2)}
        >
          Tres
        </li>
      </ul>
      <div className={`tab ${isPending ? "pending" : null}`}>
        <Suspense fallback={<Loader />}>
          {tab === 0 && <Comp resource={resource} />}
          {tab === 1 && <Comp resource={resource} />}
          {tab === 2 && <Comp resource={resource} />}
        </Suspense>
      </div>
    </>
  );
}