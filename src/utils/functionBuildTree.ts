import { IAsset, ILocation, ITreeNode } from '../types';

export const buildTree = (locations: ILocation[], assets: IAsset[]): ITreeNode[] => {
  const assetNodes: { [key: string]: ITreeNode } = {};
  const locationNodes: { [key: string]: ITreeNode } = {};
  assets.forEach(asset => {
    assetNodes[asset.id] = {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? 'component' : 'asset',
      status: asset.status,
      sensorType: asset.sensorType,
      sensorId: asset.sensorId,
      gatewayId: asset.gatewayId,
      children: [],
    };
  });

  locations.forEach(location => {
    locationNodes[location.id] = {
      id: location.id,
      name: location.name,
      type: 'location',
      children: [],
    };
  });

  assets.forEach(asset => {
    if (asset.locationId && locationNodes[asset.locationId]) {
      locationNodes[asset.locationId].children!.push(assetNodes[asset.id]);
    } else if (asset.parentId && assetNodes[asset.parentId]) {
      assetNodes[asset.parentId].children!.push(assetNodes[asset.id]);
    }
  });
  locations.forEach(location => {
    if (location.parentId && locationNodes[location.parentId]) {
      locationNodes[location.parentId].children!.push(locationNodes[location.id]);
    }
  });
  const rootNodes: ITreeNode[] = [];
  locations.forEach(location => {
    if (!location.parentId) {
      rootNodes.push(locationNodes[location.id]);
    }
  });
  assets.forEach(asset => {
    if (!asset.locationId && !asset.parentId) {
      rootNodes.push(assetNodes[asset.id]);
    }
  });

  return rootNodes;
}
