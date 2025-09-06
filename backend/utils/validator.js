


export  const validator = (...fields) => {
    console.log(fields)
  return fields.every(field => Boolean(field)); 
};