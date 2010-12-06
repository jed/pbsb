/*
  this is a silly binary clock example to show how
  pbsb endpoints can be chained.
  
  output looks like this:

  Mon, 06 Dec 2010 05:06:52 GMT
  1001100111111000110111101101100
  ☃☃☃☃☃☃☃☃☃☃☃☃

  Mon, 06 Dec 2010 05:06:53 GMT
  1001100111111000110111101101101
  ☃☃☃☃☃☃☃☃☃☃☃

  Mon, 06 Dec 2010 05:06:54 GMT
  1001100111111000110111101101110
  ☃☃☃☃☃☃☃☃☃☃☃
  
  ...

*/

pbsb = require( "./" ).pbsb

function log( msg ){ return console.log( msg ), log }

// a pbsb date endpoint
clock = pbsb( new Date )

// updated every second
setInterval( function(){ clock.set( new Date ) }, 1000 )

// a binary clock that subscribes to the date
binaryClock = pbsb( function( cb ) {
  clock.get( function fn( val ) {
    return cb( ( val / 1000 | 0 ).toString( 2 ) ), fn
  })
})

// a fancier clock that subscribes to the binary clock
fancyBinaryClock = pbsb( function( cb ) {
  binaryClock( function fn( val ) {
    return cb( val.replace( /0/g, "☃" ).replace( /1/g, "" ) ), fn
  })
})

// same as clock.get( log ). `clock` is a getter/setter, but 
// pbsb infers getting because typeof log == "function". 
clock( log )              

// `binaryClock` and `fancyBinaryClock` are getters, and can be called as is.
binaryClock( log )
fancyBinaryClock( log )