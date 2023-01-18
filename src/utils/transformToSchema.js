export const transformToSchema = (items, name, resolveName) => {
  const children = items.map((item) => ({
    node_id: name === 'Users' ? item.userName : item.id,
    name: name === 'Users' ? item.userName : resolveName(item),
    parent_id: 1,
    level: 2,
  }));

  return {
    node_id: 0,
    name,
    parent_id: null,
    level: 1,
    children,
  };
};
