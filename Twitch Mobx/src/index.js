import React from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import Buttons from "./Buttons";
import "./styles.css";
import store from "./Store";

const Twitch = observer(({ modelStore }) => {
  if (modelStore.err) {
    return <div>Error loading Data</div>;
  } else if (modelStore.loading) {
    return <div className="loading"> Loading... </div>;
  } else {
    return (
      <div className="container">
        <h1>Twitch Streamers</h1>
        <Buttons />
        <ul className="list">
          {modelStore.twitch.map(item => {
            return (
              <li
                className={`item 
                          ${item.stream}-item 
                          ${modelStore.display}`}
                key={item.id}
              >
                <h3>{item.name}</h3>
                <a href={item.channel} title={item.name} target="_blank">
                  <img className="image" src={item.logo} alt="logo" />
                </a>
                <p className={item.stream}>{item.stream}</p>
                <p className="game">
                  {item.game}
                  <span>
                    {item.video_banner ? (
                      <a href={item.self} title={item.game} target="_blank">
                        <img
                          className="banner"
                          src={item.video_banner}
                          alt={item.game}
                        />
                      </a>
                    ) : (
                      ""
                    )}
                  </span>
                </p>
                {item.status ? (
                  <p className="description">Description: {item.status}</p>
                ) : (
                  ""
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
});

ReactDOM.render(<Twitch modelStore={store} />, document.getElementById("root"));
