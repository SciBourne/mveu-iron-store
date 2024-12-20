import { Timestamp } from "mongodb"




function expiresAfter(timeLen: string, type: typeof Timestamp): Timestamp
function expiresAfter(timeLen: string, type: typeof Date): Date
function expiresAfter(timeLen: string): number
function expiresAfter(timeLen: string, type?: any): Timestamp | Date | number {
  const amount: number = Number(timeLen.slice(0, timeLen.length - 1))
  const msMul: number = 1000

  let secMul: number = 0
  let expireIn: number = 0

  switch ( timeLen.slice(timeLen.length - 1) ) {
    case "m":
      secMul = 60
      break

    case "h":
      secMul = 3600
      break

    case "d":
      secMul = 86400
      break
  }

  expireIn = Date.now() + ((amount * secMul) * msMul)

  switch (type) {
    case Timestamp:
      return Timestamp.fromNumber(expireIn)

    case Date:
      return new Date(expireIn)

    default:
      return expireIn
  }
}




export { expiresAfter }
