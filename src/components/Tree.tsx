import TreeNode from './TreeNode';
import {ITreeNode} from '../types'
interface TreeProps {
  nodes: ITreeNode[];
}

const Tree: React.FC<TreeProps> = ({ nodes }) => {
  return (
    <div className="w-96 ml-4">
      {nodes.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
};

export default Tree;