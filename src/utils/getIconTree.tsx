import { ITreeNode } from "../types";

import Location from '../assets/Location.svg'
import Cube from '../assets/Cube.svg'
import Component from '../assets/Component.png'

export const getIconTree = (node: ITreeNode) => {
    switch (true) {
    case node.type.includes('location'):
      return <img src={Location} alt="Location" />;
    case node.type.includes('asset'):
      return <img src={Cube} alt="Location" />;
    case node.type.includes('component'):
      return <img src={Component} alt="Component" />;
    default:
      return null;
  }
};