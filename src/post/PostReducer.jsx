import { useReducer } from "react";
import { INITIAL_STATE, Reducer } from "./Reducer";

function PostReducer() {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const handleFetch = (e) => {
    e.preventDefault();
    dispatch({ type: "FETCH_START" });
    fetch("https://jsonplaceholder.typicode.com/posts/1a")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "FETCH_ERROR" });
      });
  };

  console.log(state); // Check the state to confirm error is set to true

  return (
    <div>
      <button onClick={handleFetch}>
        {state.loading ? "waiting" : "fetch the data"}
      </button>
      <p>{state.post?.title}</p>
      <p>{state.error && "something went Wrong!"}</p>
    </div>
  );
}

export default PostReducer;
