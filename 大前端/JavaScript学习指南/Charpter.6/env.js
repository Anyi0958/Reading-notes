
const debug = process.env.DEBUG === '1' ?
console.log : function() {};

debug('visible only if env is set');