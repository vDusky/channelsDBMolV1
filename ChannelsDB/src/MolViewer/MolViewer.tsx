import "molstar/lib/mol-plugin-ui/skin/dark.scss";
import { Viewer } from "./Viewer";
import { Context } from "../Context";
import React from "react";

export class MolViewer extends React.Component<{ context: Context }> {

  render() {
    return <Viewer context={this.props.context} />;
  };
};

export default MolViewer;