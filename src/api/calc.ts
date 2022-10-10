// * Types
import type { AxiosResponse } from 'axios'
import type { CalcSendPayload, CalcSendResponse } from '@/contracts/calc'
// * Types

import { API_ROUTES } from '@/config/api'
import { HTTP_CLIENT } from './httpClient'

export async function calcSendData(payload: CalcSendPayload): Promise<AxiosResponse<CalcSendResponse> | void> {
  try {
    return await HTTP_CLIENT.post(API_ROUTES.calcSendData, payload)
  } catch (err: any) {
    console.log(err)
    throw err
  }
}