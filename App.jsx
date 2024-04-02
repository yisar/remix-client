import "./app.css";
import { useState, useTransition, Suspense } from "react";
import GlobalLoader from "./GlobalLoader.jsx";
import Loader from "./Loader.jsx";
import Content from "./Content.jsx";
import { fetchData } from "./fakeApi";

const initialResource = fetchData();

export default function App() {
  const [tab, setTab] = useState(0);
  const [resource, setResource] = useState(initialResource);
  const [isPending, startTransition] = useTransition();

  function handleClick(index) {
    startTransition(() => {
      setTab(index);
      setResource(fetchData());
    });
  }

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
          {tab === 0 && <Content page="Uno" resource={resource} />}
          {tab === 1 && <Content page="Dos" resource={resource} />}
          {tab === 2 && <Content page="Tres" resource={resource} />}
        </Suspense>
      </div>
    </>
  );
}