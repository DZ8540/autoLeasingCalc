export type CalcSendPayload = {
  car_coast: number,
  initail_payment: number,
  initail_payment_percent: number,
  lease_term: number,
  total_sum: number,
  monthly_payment_from: number,
}

export type CalcSendResponse = {
  success: true,
}