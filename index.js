this.pbsb = function( arg ) {
  var subs = [], count = 0, value, source, getset

  function get( sub ) {
    count || source && source( set )
    if ( sub = sub( value ) ) subs[ count++ ] = sub
  }
  
  function set( val ) {
    var i = 0, l = count, sub, resubs = []
    
    for ( count = 0; i < l; i++ ) {
      if ( sub = subs[ i ]( val ) ) resubs[ count++ ] = sub
    }
      
    subs = resubs
    value = val
    
    return count && set
  }
    
  if ( arg && arg.call && arg.apply ) return source = arg, get

  getset = function( arg ) {
    ( arg && arg.call && arg.apply ? get : set ).apply( this, arguments )
  }
  
  getset.get = get
  getset.set = set

  value = arg
  
  return getset
}