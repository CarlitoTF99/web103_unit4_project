export function validate(cfg){
  if (!cfg.name) return 'Please enter a name for your racket.';
  if (cfg.headsize === '95' && cfg.extended) return '95 headsize cannot be extended length.';
  if (cfg.headsize === '104' && cfg.stringpattern === '18x20') return '104 headsize is incompatible with 18x20 string pattern.';
  if (cfg.custompaint && cfg.framecolor === 'white') return 'Custom paint is unavailable for white frames.';
  return null;
}
