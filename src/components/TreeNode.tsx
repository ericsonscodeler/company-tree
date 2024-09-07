import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import { ITreeNode } from '../types'; // Ajuste o caminho conforme necessário

interface ITreeNodeProps {
  node: ITreeNode;
}

const TreeNode: React.FC<ITreeNodeProps> = ({ node }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="ml-4">
      <div className="flex flex-row items-center space-x-2 py-2">
        <span onClick={toggleOpen} className="cursor-pointer">
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </span>
        <MapPin />
        <span>{node.name}</span>
      </div>
      {isOpen && node.children && (
        <div className="ml-4">
          {node.children.map(childNode => (
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
