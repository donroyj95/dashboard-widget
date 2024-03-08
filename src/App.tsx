import React from "react";
import "./App.css";
import TaskManager from "./taskManager/TaskManager";
import NewsFeed from "./newsFeed/NewsFeed";
import WeatherWidget from "./weatherWidget/WeatherWidget";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TaskManager />
        <NewsFeed />
        <WeatherWidget />
      </header>
    </div>
  );
};

export default App;
