// skypack has issues with `ts-node` package. and its slow (sometimes)
export const getPackageJsonUrl = (packageName: string) => `https://cdn.jsdelivr.net/npm/${packageName}/package.json`;
