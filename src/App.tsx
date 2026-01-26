import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button';
import './App.css'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
import {Counter} from "./features/counter/Counter.tsx";

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <Provider store={store}>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button className="text-white" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <div className="p-10">
          <div className="bg-red-500 text-white font-bold rounded-xl p-6">
            Tailwind test
          </div>
        </div>
        <Button variant="contained">MUI test</Button>
        <div>
          <Counter />
        </div>
      </Provider>
    </>
  )
}

export default App
