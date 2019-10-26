/* eslint-disable no-undef */
$(function() {
  var $openPrice = $('#scOpenPrice')
  var $supportPrice = $('#scSupportPrice')
  var $slotQuant = $('#scSlotQuant')
  var $stopJump = $('#scStopJump')
  var $compartment = $('#scCompartment')
  var $risk = $('#scRisk')
  var $totalCash = $('#scBuyCash')

  var $predictedlot = $('#scPredictedSlot')
  // var $predictedUsedCash = $('#scPredictedUsedCash')
  var $predictedBuyPrice = $('#scPredictedBuyPrice')
  var $predictedStopPrice = $('#scPredictedStopPrice')
  var $predictedLoss = $('#scPredictedLoss')
  var $predictedRisk = $('#scPredictedRisk')

  var $btnClearOpenPrice = $('#scBtnClearOpenPrice');
  var $btnClearSupportPrice = $('#scBtnClearSupportPrice');

  $slotQuant.val(10)
  $stopJump.val(15)
  $compartment.val(3)
  $risk.val(0.5)
  $totalCash.val(400000)

  $openPrice.on('change', renderRes)
  $supportPrice.on('change', renderRes)
  $slotQuant.on('change', renderRes)
  $stopJump.on('change', renderRes)
  $compartment.on('change', renderRes)
  $risk.on('change', renderRes)
  $totalCash.on('change', renderRes)

  $btnClearOpenPrice.on('click', clearOpenPrice)
  $btnClearSupportPrice.on('click', clearSupportPrice)

  function clearOpenPrice() {
    $openPrice.val('')
  }

  function clearSupportPrice() {
    $supportPrice.val('')
  }

  function renderRes() {
    if ($openPrice.val() && $supportPrice.val() && $slotQuant.val() &&
      $stopJump.val() && $compartment.val() && $risk.val() && $totalCash.val()) {
      renderCalc()
      $('.alert').show()
    } else {
      $('.alert').hide()
    }
  }

  function renderCalc() {
    const res = calc(
      $openPrice.val(),
      $supportPrice.val(),
      $slotQuant.val(),
      $stopJump.val(),
      $compartment.val(),
      $risk.val(),
      $totalCash.val(),
    )

    $predictedlot.text(res[0])
    $predictedBuyPrice.text($openPrice.val())
    $predictedStopPrice.text(res[1])
    $predictedLoss.text(res[2].toFixed(2))
    $predictedRisk.text(res[3].toFixed(2))
  }

  function calc(openPrice, supportPrice, slotQuant, stopJump, compartment, risk, totalCash) {
    openPrice = +openPrice
    supportPrice = +supportPrice
    slotQuant = +slotQuant
    stopJump = +stopJump
    compartment = +compartment;
    risk = +risk
    totalCash = +totalCash

    var stopPrice = supportPrice - stopJump
    var quant = totalCash * (risk / compartment / 100) / ((openPrice - stopPrice) * slotQuant)
    var lot = Math.floor(quant)
    var predictedLoss = lot * (openPrice - stopPrice) * slotQuant
    var predictedRisk = predictedLoss / totalCash * 100

    return [lot, stopPrice, predictedLoss, predictedRisk]
  }
})
