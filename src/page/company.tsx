import { useParams, useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import {Input} from "../Components/Input";
import { IAsset, ILocation, ITreeNode } from "../types";
import { buildTree } from "../utils/functionBuildTree";
import {Tree} from "../components/Tree";
import { useEffect, useState } from "react";
import { Details } from "../components/Details";

export const Company = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [treeData, setTreeData] = useState<ITreeNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<ITreeNode>();

  const handleNodeSelect = (node: ITreeNode) => {
    setSelectedNode(node);
  };

  const { isLoading: loadingLocations, error: errorLocations, data: dataLocations } = useQuery<ILocation[]>(
    `treeDataLocation${name}`, 
    () =>
      fetch(`http://fake-api.tractian.com/companies/${id}/locations`).then(res =>
        res.json()
      )
  );

  const { isLoading: loadingAssets, error: errorAssets, data: dataAssets } = useQuery<IAsset[]>(
    `treeDataAssets${name}`,
    () => 
      fetch(`http://fake-api.tractian.com/companies/${id}/assets`).then(res => res.json())
  );

   useEffect(() => {
    if (dataLocations && dataAssets) {
      const allTreeData = buildTree(dataLocations, dataAssets);
      const filterTree = (nodes: ITreeNode[], term: string): ITreeNode[] => {
        return nodes
          .map(node => {
            const filteredChildren = node.children ? filterTree(node.children, term) : [];
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

      setTreeData(filterTree(allTreeData, searchTerm));
    }
  }, [searchTerm, dataLocations, dataAssets]);

  return (
    <div>
      <div className="flex flex-row p-5 items-center">
        <span className="text-2xl">Ativos /</span>
        <span className="text-base ml-2 mt-1">{name}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-gray-300">
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          <Input searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          {loadingLocations || loadingAssets ? 
          <p>Loading...</p> : errorLocations || errorAssets ? 
          <p>Error loading data</p> : 
          <Tree nodes={treeData} onNodeSelect={handleNodeSelect}/>}
        </div>
        <div className="w-full h-full bg-white border border-sky-500">
          {selectedNode ? <Details node={selectedNode} /> : <p>Selecione um componente para ver os detalhes</p>}
        </div>
      </div>
    </div>
  );
};
