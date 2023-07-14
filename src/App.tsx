import { useState } from "react";

export default function App() {
  const [data, setData] = useState("hello world");
  const inputHandler = (e: React.FormEvent) => {
    setData((e.target as HTMLInputElement).value);
  };
  return (
    <>
      <div>{data}</div>
      <input type="text" onInput={inputHandler} />
    </>
  );
}
