import { ILocation, ITreeNode } from '../types';

export const buildTree = (locations: ILocation[]): ITreeNode[] => {
  const map = new Map<string, ITreeNode>();
  const roots: ITreeNode[] = [];

  locations.forEach(location => {
    map.set(location.id, { ...location, children: [] });
  });

  map.forEach(node => {
    if (node.parentId) {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children!.push(node);
      }
    } else {
      roots.push(node);
    }
  });

  return roots;
};