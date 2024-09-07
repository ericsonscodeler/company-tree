export interface ILocation {
  id: string;
  name: string;
  parentId: string;
}
export interface ITreeNode {
  id: string;
  name: string;
  parentId: string;
  children?: ITreeNode[];
}