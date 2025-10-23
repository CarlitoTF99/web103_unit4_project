export function computePrice({ headsize, stringpattern, extended, custompaint }){
  const base = headsize === '95' ? 229 : headsize === '98' ? 219 : headsize === '100' ? 199 : 189;
  const extras = (extended ? 30 : 0) + (custompaint ? 50 : 0) + (stringpattern === '18x20' ? 10 : 0);
  return base + extras;
}
