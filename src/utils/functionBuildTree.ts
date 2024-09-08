import { IAsset, ILocation, ITreeNode } from '../types';

export const buildTree = (locations: ILocation[], assets: IAsset[]): ITreeNode[] => {
  const assetNodes: { [key: string]: ITreeNode } = {};
  assets.forEach(asset => {
    assetNodes[asset.id] = {
      id: asset.id,
      name: asset.name,
      type: 'asset',
      status: asset.status,
      sensorType: asset.sensorType,
      gatewayId: asset.gatewayId,
      children: [],
    };
  });
  const locationNodes: { [key: string]: ITreeNode } = {};
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
    }
  });

  const rootNodes: ITreeNode[] = [];
  locations.forEach(location => {
    if (location.parentId) {
      if (locationNodes[location.parentId]) {
        locationNodes[location.parentId].children!.push(locationNodes[location.id]);
      }
    } else {
      rootNodes.push(locationNodes[location.id]);
    }
  });

  return rootNodes;
}