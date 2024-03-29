/* eslint-disable no-undef */
$(function() {
  var $open = $('#sc-openPrice')
  var $support = $('#sc-supportPrice')
  var $stop = $('#sc-stop')
  var $chance = $('#sc-chance')
  var $cash = $('#sc-buyCash')
  var $quant = $('#sc-quant')
  var $money = $('#sc-money')
  var $stopPrice = $('#sc-stopPrice')
  var $buyPrice = $('#sc-buyP')
  var $predictedRisk = $('#scPredictedRisk')
  var $predictedLoss = $('#scPredictedLoss')

  $chance.val(0.5)
  $stop.val(2)
  $cash.val(600000)

  $open.on('change', renderCalc)
  $support.on('change', renderCalc)
  $stop.on('change', renderCalc)
  $chance.on('change', renderCalc)
  $cash.on('change', renderCalc)

  function renderCalc() {
    const res = calc(
      $open.val(),
      $support.val(),
      $stop.val(),
      $chance.val(),
      $cash.val()
    )
    $quant.text(res[0])
    $money.text(res[1])
    $stopPrice.text(res[2].toFixed(2))
    $buyPrice.text($open.val())
    $predictedRisk.text(res[3].toFixed(2))
    $predictedLoss.text(res[4].toFixed(2))
  }

  function calc(open, support, stop, chance, cash) {
    var o = +open
    var s = +support
    var ss = +stop
    var c = +chance
    var cc = +cash
    if (isNaN(o) || isNaN(s) || isNaN(ss) || isNaN(c) || isNaN(cc)) {
      return [0, 0, 0]
    } else {
      var sss = (support - (open * ss) / 100)
      var quant = cc * c / 100 / (open - sss)
      var qq = Math.floor(quant / 100) * 100
      var ccc = qq * o
      var predictedRisk = qq * (open - sss) / cc * 100
      var predictedLoss = qq * (open - sss)

      return [qq, ccc, sss, predictedRisk, predictedLoss]
    }
  }
})
