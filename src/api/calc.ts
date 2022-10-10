import { API_ROUTES } from '@/config/api'
import type { CalcSendPayload, CalcSendResponse } from '@/contracts/calc'
import type { AxiosResponse } from 'axios'
import { HTTP_CLIENT } from './httpClient'

export async function calcSendData(payload: CalcSendPayload): Promise<AxiosResponse<CalcSendResponse> | void> {
  try {
    return await HTTP_CLIENT.post(API_ROUTES.calcSendData, payload)
  } catch (err: any) {
    console.log(err)
    throw err
  }
}