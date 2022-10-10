// * Types
import type { CalcSendPayload } from '@/contracts/calc'
// * Types

import { calcSendData } from '@/api/calc'
import { MESSAGES } from '@/config/messages'

export default class CalcService {
  public static async sendData(payload: CalcSendPayload): Promise<void> {
    try {
      await calcSendData(payload)

      alert(MESSAGES.SUCCESS)
    } catch (err: any) {
      alert(MESSAGES.ERROR)
    }
  }
}