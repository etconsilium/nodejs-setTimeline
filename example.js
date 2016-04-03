
'use strict'

const setTimeline = require('settimeline').setTimeline;

let $tl = setTimeline( function(data){console.log( data )}, {max:20, min:1, interval:10000})

for (let i = 50; i > 0; i--) { $tl(i) }
