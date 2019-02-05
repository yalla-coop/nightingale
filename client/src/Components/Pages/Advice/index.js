import React, { Component } from "react";
import Collapsible from "react-collapsible";

// styling
import { Wrapper, Article } from "./index.style";

// common components
import Title from "../../Common/Title";

export default class Advice extends Component {
  render() {
    return (
      <React.Fragment>
        <Title value="Advice" />
        <Wrapper>
          <Collapsible
            trigger={<h3>Section One</h3>}
            transitionTime="300"
            easing="ease"
            openedClassName="open"
          >
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
          </Collapsible>
          <Collapsible
            trigger={<h3>Section Two</h3>}
            transitionTime="300"
            easing="ease"
          >
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
          </Collapsible>
          <Collapsible
            trigger={<h3>Section Three</h3>}
            transitionTime="300"
            easing="ease"
          >
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
          </Collapsible>
          <Collapsible
            trigger={<h3>Section Four</h3>}
            transitionTime="300"
            easing="ease"
          >
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
            <Article>
              <p>Collapsible content 1</p>
              <a href="www.article.com" target="_blank">
                Read more
              </a>
            </Article>
          </Collapsible>
        </Wrapper>
      </React.Fragment>
    );
  }
}
