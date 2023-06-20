import React, { Component } from "react";

import MouseMonitor from "./MouseMonitor";

interface Props {
  onMouseOver: (content: JSX.Element) => void;
  popupContent: JSX.Element;
  onMouseOut: () => void;
  onClick: () => void;
  children: JSX.Element;
}

interface State {
  mouseIn: boolean;
}

export class Popup extends Component<Props, State> {
  state: State = {
    mouseIn: false,
  };

  render() {
    const { onMouseOver, popupContent, onMouseOut, onClick } = this.props;

    return (
      <div
        onMouseOver={() => {
          this.setState({ mouseIn: true });

          onMouseOver(
            <MouseMonitor
              onMoveAway={() => {
                if (this.state.mouseIn) {
                  return;
                }

                onMouseOut();
              }}
              paddingX={60}
              paddingY={30}
              children={popupContent}
            />
          );
        }}
        onMouseOut={() => {
          this.setState({ mouseIn: false });
        }}
        onClick={() => {
          onClick();
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Popup;
