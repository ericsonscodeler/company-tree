import { useParams, useLocation } from "react-router-dom";
import { useQuery } from 'react-query';
import Input from "../Components/Input";
import { IAsset, ILocation, ITreeNode } from "../types";
import { buildTree } from "../utils/functionBuildTree";
import Tree from "../components/Tree";
import { useState } from "react";
import { Details } from "../components/Details";

export const Company = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

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

  const treeData = dataLocations && dataAssets ? buildTree(dataLocations, dataAssets) : [];

  return (
    <div>
      <div className="flex flex-row p-5 items-center">
        <span className="text-2xl">Ativos /</span>
        <span className="text-base ml-2 mt-1">{name}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full h-full p-4 bg-gray-300">
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          <Input />
          {loadingLocations || loadingAssets ? <p>Loading...</p> : errorLocations || errorAssets ? <p>Error loading data</p> : <Tree nodes={treeData} onNodeSelect={handleNodeSelect}/>}
        </div>
        <div className="w-full h-full p-4 bg-white border border-sky-500">
          {selectedNode ? <Details node={selectedNode} /> : <p>Selecione um componente para ver os detalhes</p>}
        </div>
      </div>
    </div>
  );
};
