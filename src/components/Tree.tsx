import TreeNode from './TreeNode';
import {ITreeNode} from '../types'
interface TreeProps {
  nodes: ITreeNode[];
  onNodeSelect: (node: ITreeNode) => void
}

export const Tree: React.FC<TreeProps> = ({ nodes, onNodeSelect }) => {
  return (
    <div className="w-96">
      {nodes.map(node => (
        <TreeNode key={node.id} node={node} onNodeSelect={onNodeSelect}/>
      ))}
    </div>
  );
};