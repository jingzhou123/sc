/* eslint-disable no-undef */
$(function() {
  var $open = $('#sc-openPrice')
  var $support = $('#sc-supportPrice')
  var $stop = $('#sc-stop')
  var $risk = $('#scRisk')
  var $cash = $('#sc-buyCash')
  var $quant = $('#sc-quant')
  var $money = $('#sc-money')
  var $stopPrice = $('#sc-stopPrice')
  var $buyPrice = $('#sc-buyP')
  var $predictedRisk = $('#scPredictedRisk')
  var $predictedLoss = $('#scPredictedLoss')
  var $compartment = $('#scCompartment')
  var $btnOpenPrice = $('#scBtnClearOpenPrice');
  var $btnSupportPrice = $('#scBtnClearSupportPrice');

  $risk.val(0.5)
  $stop.val(2)
  $cash.val(600000)
  $compartment.val(3)

  $open.on('change', renderRes)
  $support.on('change', renderRes)
  $stop.on('change', renderRes)
  $risk.on('change', renderRes)
  $cash.on('change', renderRes)

  $btnOpenPrice.on('click', clearOpenPrice)
  $btnSupportPrice.on('click', clearSupportPrice)

  function clearOpenPrice() {
    $open.val('')
  }

  function clearSupportPrice() {
    $support.val('')
  }

  function renderRes() {
    if ($open.val() && $support.val() && $stop.val() && $risk.val() && $cash.val()) {
      renderCalc()
      $('.alert').show()
    } else {
      $('.alert').hide()
    }
  }

  function renderCalc() {
    const res = calc(
      $open.val(),
      $support.val(),
      $stop.val(),
      $risk.val(),
      $cash.val(),
      $compartment.val()
    )
    $quant.text(res[0])
    $money.text(res[1])
    $stopPrice.text(res[2].toFixed(2))
    $buyPrice.text($open.val())
    $predictedRisk.text(res[3].toFixed(2))
    $predictedLoss.text(res[4].toFixed(2))
  }

  function calc(open, support, stop, risk, cash, compartment) {
    open = +open
    support = +support
    stop = +stop
    risk = +risk
    cash = +cash
    compartment = +compartment;

    var actualStop = (support - (open * stop) / 100)
    var quant = cash * (risk / compartment) / 100 / (open - actualStop)
    var lot = Math.floor(quant / 100) * 100
    var usedCash = lot * open
    var predictedRisk = lot * (open - actualStop) / cash * 100
    var predictedLoss = lot * (open - actualStop)

    return [lot, usedCash, actualStop, predictedRisk, predictedLoss]
  }
})
