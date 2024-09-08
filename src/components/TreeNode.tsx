import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Box, PackageOpen } from 'lucide-react';
import { ITreeNode } from '../types';

interface ITreeNodeProps {
  node: ITreeNode;
  onNodeSelect: (node: ITreeNode) => void
}

const TreeNode: React.FC<ITreeNodeProps> = ({ node, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const getIcon = () => {
    if (node.type === 'component') {
      return <PackageOpen />;
    } else if (node.children && node.children.length > 0) {
      return <Box />;
    } else {
      return <MapPin />;
    }
  };

  return (
    <div className="ml-4">
      <div className="flex flex-row items-center space-x-2 py-2">
        {node.children && node.children.length > 0 && (
          <span onClick={toggleOpen} className="cursor-pointer">
            {isOpen ? <ChevronDown /> : <ChevronUp />}
          </span>
        )}
        <span>{getIcon()}</span>
        <span onClick={() => onNodeSelect(node)} className="cursor-pointer">
          {node.name}
        </span>
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map(childNode => (
            <TreeNode key={childNode.id} node={childNode} onNodeSelect={onNodeSelect} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;