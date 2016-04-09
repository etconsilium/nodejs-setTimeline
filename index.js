
'use strict'

module.exports = {

  setTimeline: function(callback, rps, context) {

    const _rps = {max:20, min:1, interval:1000, random: 11}
    rps = Object.assign({}, _rps, rps)
    let _rq = { rps: rps
      , time_start:Date.now()
      , time_last:Date.now()
      , query_quantity:0
      , query_counter:0
      , interval_counter:0
    }

    return function(){
      let args = arguments

      _rq.query_counter ++

      if (_rq.query_counter == rps.max) {
        _rq.interval_counter++
        _rq.query_counter = 0
      }

      let next_interval = 
        Date.now() - _rq.time_last    //  возможное смещение
        + _rq.interval_counter * _rq.rps.interval
        + _rq.query_counter * _rq.rps.interval / (_rq.rps.max + 1)  //  интервалов на один больше

      if (parseInt(rps.random) === rps.random)
        next_interval += Math.random() * _rq.rps.interval / (_rq.rps.max * _rq.rps.random)  //  произвольный коэффициент рандомности

      next_interval = Math.floor( next_interval );

      setTimeout( function(){return (callback.apply(context,args))} , next_interval)

      _rq.time_last = Date.now()

    }.bind(context)
  }
}
