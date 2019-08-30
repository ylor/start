import React, { useEffect } from "react";
// import styled from "styled-components";

import { config } from "../../config";
import "./style.scss";

const { commands } = config;

export default function Links(props) {
  const categories = [
    ...new Set([...commands.map(command => command.category)])
  ]
    .slice(1)
    .sort();

  useEffect(() => {
    function keyHandler(event) {
      // Make these keys not trigger anything
      if (event.key === "Shift") {
        return;
      }

      if (event.key === "?" || event.key === "Escape") {
        event.preventDefault();
        props.history.push("/");
        return;
      }
    }

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, [props.history]);

  return (
    <aside className="categories">
      {categories.map(category => (
        <section key={category} className="links">
          <ul>
            <h1>{category}</h1>
            {commands.map(command =>
              command.category === category ? (
                <li key={command.name} title={"Shortcut: " + command.key}>
                  {/* <span>{command.key}</span> */}
                  <a key={command.url} href={command.url}>
                    {command.name}
                  </a>
                </li>
              ) : null
            )}
          </ul>
        </section>
      ))}
    </aside>
  );
}
