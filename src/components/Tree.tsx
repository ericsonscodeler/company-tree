import TreeNode from './TreeNode';
import {ITreeNode} from '../types'
interface TreeProps {
  nodes: ITreeNode[];
  onNodeSelect: (node: ITreeNode) => void
}

const Tree: React.FC<TreeProps> = ({ nodes, onNodeSelect }) => {
  return (
    <div className="w-96 ml-4">
      {nodes.map(node => (
        <TreeNode key={node.id} node={node} onNodeSelect={onNodeSelect}/>
      ))}
    </div>
  );
};

export default Tree;