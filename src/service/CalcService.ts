import { calcSendData } from '@/api/calc'
import { MESSAGES } from '@/config/messages'
import type { CalcSendPayload } from '@/contracts/calc'

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