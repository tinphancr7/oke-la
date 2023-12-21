import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import "./styles.css";

export default function App() {
  const [state, setState] = useState<string>("Active");
  const [count, setCount] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);

  const onIdle = () => {
    setState("Idle");
  };

  const onActive = () => {
    setState("Active");
  };

  const onAction = () => {
    setCount(count + 1);
  };

  const { getRemainingTime } = useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout: 10_000,
    throttle: 500,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(Math.ceil(getRemainingTime() / 1000));
    }, 500);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <h1>React Idle Timer</h1>
      <h2>useIdleTimer</h2>
      <br />
      <p>Current State: {state}</p>
      <p>Action Events: {count}</p>
      <p>{remaining} seconds remaining</p>
    </>
  );
}
