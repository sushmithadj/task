import "./App.css";
import List from "./Component/List";
import InputWithLable from "./Component/InputWithLable";
import { useEffect, useReducer, useState } from "react";
import { useEffect, useReducer } from "react";
import useSemiPersistenceState from "./hooks/useSemiPersistenceState";
import { type } from "os";

const list = [
{
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
  {
    title: "Learn React",
    url: "https://redux.js.org/",
    author: "Dan Abramov",
    num_comments: 2,
    points: 5,
    objectID: 2,
  },
  {
    title: "Demo React",
    url: "https://redux.js.org/",
    author: "Dan Abramov",
    num_comments: 2,
    points: 5,
    objectID: 3,
  },
];

const storyReducer = (state: any, action: any) => {
  switch (action.type) {
 @@ -61,6 +25,7 @@ const storyReducer = (state: any, action: any) => {
      return state;
  }
};
const API_END_POINT = "https://hn.algolia.com/api/v1/search?query=";

function App() {
  const [stories, dispatchStoreis] = useReducer(storyReducer, {
 @@ -73,30 +38,25 @@ function App() {
    "",
    "searchedTearm"
  );
  const getAsyncStoreis = new Promise((res, rej) =>
    setTimeout(() => res({ data: { stories: list } }), 2000)
  );

  useEffect(() => {
    dispatchStoreis({ type: "Fetch_INIT" });

    getAsyncStoreis
    fetch(API_END_POINT + searchedTearm)
      .then((r) => r.json())
      .then((result: any) => {
        dispatchStoreis({ type: "SET_STORYIES", payload: result.data.stories });
        dispatchStoreis({ type: "SET_STORYIES", payload: result.hits });
      })
      .catch(() => {
      .catch((e) => {
        console.log(e);
        dispatchStoreis({ type: "FEATCH_STORIES_FAILED" });
      });
  }, []);
  }, [searchedTearm]);

  const searchHnadler = (e: any) => {
    setSerchedTearm(e.target.value);
  };

  const filterdList: any = stories.data.filter((item: any) => {
    return item.title.toUpperCase().includes(searchedTearm.toUpperCase());
  });

  const handelRemoveStory = (id: any) => {
    dispatchStoreis({ type: "Remove_STORY", payload: id });
  };
 @@ -116,7 +76,7 @@ function App() {
      {stories.isLoading ? (
        <p>loading..</p>
      ) : (
        <List STories={filterdList} onRemove={handelRemoveStory} />
        <List STories={stories.data} onRemove={handelRemoveStory} />
      )}
      {stories.isError && <p>somthing went wrong...</p>}
    </div>