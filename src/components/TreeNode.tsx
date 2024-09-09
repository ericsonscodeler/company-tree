import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ITreeNode } from '../types';

import { getSensorIcon } from '../utils/getSensorIcon';
import { getIconTree } from '../utils/getIconTree';

interface ITreeNodeProps {
  node: ITreeNode;
  onNodeSelect: (node: ITreeNode) => void
}

export const TreeNode: React.FC<ITreeNodeProps> = ({ node, onNodeSelect }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  const icon = getSensorIcon(node.sensorType ?? '', node.status ?? '');

  return (
  <div className="ml-4">
    <div className="flex flex-row items-center space-x-2 py-2">
      {node.children && node.children.length > 0 && (
        <span onClick={toggleOpen} className="cursor-pointer">
          {isOpen ? <ChevronDown /> : <ChevronUp />}
        </span>
      )}
      <span>{getIconTree(node)}</span>
      <span 
        onClick={() => node.type === 'component' && onNodeSelect(node)} 
        className={`cursor-pointer ${node.type !== 'component' ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {node.name}
      </span>
      {icon && <img className="mt-1" src={icon} alt={`Sensor status ${icon}`} />}
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
}