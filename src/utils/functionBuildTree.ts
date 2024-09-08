import { IAsset, ILocation, ITreeNode } from '../types';

export const buildTree = (locations: ILocation[], assets: IAsset[]): ITreeNode[] => {
  const map = new Map<string, ITreeNode>();
  const roots: ITreeNode[] = [];
  locations.forEach(location => {
    map.set(location.id, {
      id: location.id,
      name: location.name,
      type: 'location',
      children: []
    });
  });

  assets.forEach(asset => {
    map.set(asset.id, {
      id: asset.id,
      name: asset.name,
      type: asset.sensorType ? 'component' : 'asset',
      children: []
    });
  });

  assets.forEach(asset => {
    if (asset.locationId) {
      const locationNode = map.get(asset.locationId);
      if (locationNode) {
        locationNode.children!.push(map.get(asset.id)!);
      }
    } else if (asset.parentId) {
      const parentAssetNode = map.get(asset.parentId);
      if (parentAssetNode) {
        parentAssetNode.children!.push(map.get(asset.id)!);
      }
    }
  });

  locations.forEach(location => {
    if (location.parentId) {
      const parentLocationNode = map.get(location.parentId);
      if (parentLocationNode) {
        parentLocationNode.children!.push(map.get(location.id)!);
      }
    } else {

      roots.push(map.get(location.id)!);
    }
  });
  assets.forEach(asset => {
    if (!asset.parentId && !asset.locationId) {
      roots.push(map.get(asset.id)!);
    }
  });

  return roots;
}