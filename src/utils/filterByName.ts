import { ITreeNode } from "../types";

export const filterByName = (nodes: ITreeNode[], term: string): ITreeNode[] => {
    return nodes
      .map(node => {
        const filteredChildren = node.children ? filterByName(node.children, term) : [];
        if (node.name.toLowerCase().includes(term.toLowerCase()) || filteredChildren.length > 0) {
          return {
            ...node,
            children: filteredChildren,
          };
        }
        return null;
      })
      .filter(node => node !== null) as ITreeNode[];
  };