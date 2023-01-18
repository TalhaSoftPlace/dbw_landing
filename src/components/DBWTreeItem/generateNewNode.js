import { v4 as uuidv4 } from 'uuid';
export const generateNewNode = (level, count, branchName) => {
  switch (level) {
    case 1:
      return {
        nodeId: uuidv4(),
        title: `${branchName}`,
        icon: '',
        deleteAble: true,
        more: true,
        children: [],
      };
    case 2:
      return {
        nodeId: uuidv4(),
        title: `${branchName}`,
        icon: '',
        deleteAble: true,
        more: true,
        children: [],
      };
    case 3:
      return {
        nodeId: uuidv4(),
        title: `${branchName}`,
        icon: '',
        deleteAble: true,
        more: true,
        children: [],
      };
    default:
      return {
        nodeId: uuidv4(),
        title: `Sub Team ${count + 1}`,
        icon: '',
        deleteAble: true,
        more: true,
        children: [],
      };
  }
};
