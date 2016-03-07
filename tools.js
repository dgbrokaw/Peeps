function extend(a, b) {
  if (typeof(b) === 'object') for (var key in b) a[key] = b[key];
  return a;
}