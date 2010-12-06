# pbsb

pbsb is a tiny javascript function that elegantly merges two common ideas in javascript: getters/setters and publish/subscribe.

## overview

    var endpoint = new pbsb     // create
    
    endpoint.set( value )       // set (publish)
    endpoint.get( callback )    // get (subscribe)
    endpoint( valueOrCallback ) // infer get/set by argument

## description

a pbsb endpoint consists of:

1. a `get` function, which can be called to retrieve the endpoint's current value and optionally subscribe to subsequent updates, and

2. a `set` function, which sets the endpoint's value and notifies all of the current subscribers.

## features

- **simple**: pbsb unifies the getting/setting and publish/subscribe paradigms into one asynchronous function.

- **tiny**: currently only 210 closure'd bytes, pbsb is suitable for use as an embeddable building block in larger pub/sub implementations.

- **functional**: `get` and `set` are functions, not methods, which means they can be passed into other callback chains without binding.

- **clean**: pbsb's API facilitates the creation of endpoints that automatically subscribe to other endpoints, to keep logic cleanly separated.

- **terse**: subscribers can return a function upon callback to renew their subscription, avoiding awkward `unbind`/`unsubscribe` methods.

- **optionally sweet**: when called without an upstream setter, pbsb returns a single function that infers getting/setting by argument type.

- **sync enough**: initial subscriber callbacks are async but blocking, so an endpoint's current value can be obtained without leaving the current context.

## API

create an endpoint:

    var endpoint = new pbsb

create an endpoint with an initial value:

    var endpoint = pbsb( value )    // if value is not a function

set the endpoint's value:

    endpoint.set( value )
    
get the endpoint's current value:

    endpoint.get( function( value ) {
      // do something with value
    })

let pbsb figure out if you want to get or set:

    var log = function( x ){ console.log( x ) }
    var val = "this is not a function"

    endpoint( val ) // val is not a function, so endpoint.set( val )
    endpoint( log ) // log is a function, so endpoint.get( log )
    
get the endpoint's current value AND subscribe to updates:

    endpoint.get( function listener( value ) {
      // do something with value
      return listener
    })

get the endpoint's current value AND subscribe to updates for the next hour:

    var expires = +new Date + 60 * 60 * 1000
    endpoint.get( function listener( value ) {
      // do something with value
      if ( expires > new Date ) return listener
    })

create an endpoint's getter and callback with its setter:

    var get = pbsb( function( set ) {
      // protip: for best results, chain endpoints by
      // passing set as the getter for another endpoint!
    })
    
see the included example for ideas about how endpoints can be chained.

## license

copyright (c) 2010 [jed schmidt](http://jedschmidt.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 
The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.