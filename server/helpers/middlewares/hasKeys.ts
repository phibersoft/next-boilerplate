const hasKeys = (keys: string[], body: object) => {
  var objKeys = Object.keys(body);
  keys.forEach((k) => {
    if (!objKeys.includes(k))
      throw new Error(`${k} nesnesi olmadan bu işlem yapılamaz`);
    if (body[k] == "") throw new Error(`${k} nesnesi boş kalamaz.`);
  });
};

export default hasKeys;
