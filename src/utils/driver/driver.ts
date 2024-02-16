export const ESC = 27
export const GS = 29
export const LF = 10
export const PAPER_FULL_CUT = [ GS, 86, 0 ] // Full cut paper
export const PAPER_PART_CUT = [ GS, 86, 1 ] // Partial cut paper

const EIGHT_DOT_DENSITY = 0
const TWENTY_FOUR_DOT_DENSITY = 33
// enum PrintModes {
//   EIGHT_DOT_DENSITY = 0,
//   TWENTY_FOUR_DOT_DENSITY = 33,
// }
//@ts-ignore
export async function setLineSpacing (device, dotSpacing) {
  await sendBytes(device, new Uint8Array([ESC, 0x33, dotSpacing]))
}
//@ts-ignore
function charToByte (char) {
    //@ts-ignore
  return String.prototype.charCodeAt.call(char)
}
//@ts-ignore
function stringToBytes (str) {
  return Array.from(str).reduce(
    (prev, char) => {
        //@ts-ignore
      prev.push(charToByte(char))
      return prev
    },
    []
  )
}
//@ts-ignore
export async function reset (device) {
  await sendBytes(device, new Uint8Array([ESC, 0x40]))
}
//@ts-ignore
export async function reverse ( device, { enabled } = { enabled: 1 }) {
  await sendText(device, '\x1DB' + enabled)
}
/**
 * Select an endpoint from the currently selected configuration by direction
 * @param direction 'out' or 'in'
 * @param device the connected USBDevice
 */
//@ts-ignore
export function selectEndpoint (direction, device) {
  const endpoint = device.configuration
    .interfaces[0]
    .alternate
    //@ts-ignore
    .endpoints.find(ep => ep.direction === direction)

  if (endpoint == null) {
    throw new Error(`Endpoint ${direction} not found in device interface.`)
  }
  return endpoint
}
//@ts-ignore
export async function sendText (device, str) {
    //@ts-ignore
  const bytes = new Uint8Array(stringToBytes(str))
  console.log('text byte', bytes)
  const endpoint = selectEndpoint('out', device)
  await device.transferOut(endpoint.endpointNumber, bytes)
}
//@ts-ignore
export async function sendBytes (device, bytes) {
  const endpoint = selectEndpoint('out', device)
  const t = await device.transferOut(endpoint.endpointNumber, bytes)
  return t
}
//@ts-ignore
export async function setCharacterStyle ( device, style
  // style: {
  //   smallFont;
  //   emphasized?: boolean;
  //   doubleHeight?: boolean;
  //   doubleWidth?: boolean;
  //   underline?: boolean;
  // } = {}
) {
  let v = 0

  if (style.smallFont) {
    v |= 1 << 0
  }

  if (style.emphasized) {
    v |= 1 << 3
  }

  if (style.doubleHeight) {
    v |= 1 << 4
  }

  if (style.doubleWidth) {
    v |= 1 << 5
  }

  if (style.underline) {
    v |= 1 << 7
  }

  await sendBytes(device, new Uint8Array([ESC, 0x21, v]))
}
//@ts-ignore
export async function printImage (device, imageData, dpi) {
  // await setLineSpacing(device, dpi)
  // const imageWidth = imageData[0].length
  // const mode = dpi === 8 ? EIGHT_DOT_DENSITY : TWENTY_FOUR_DOT_DENSITY

  // if (imageData.length % dpi !== 0) {
  //   throw new Error(`Image height must be divisible by ${dpi} currently is ${imageData.length}`)
  // }

  // for (let y = 0; y < imageData.length; y += dpi) {
  //   await sendBytes(
  //     device,
  //     new Uint8Array([
  //       ESC,
  //       42,
  //       mode,
  //       (255 & imageWidth), // nL low byte,
  //       (65280 & imageWidth) >> 8 // nH height byte
  //     ])
  //   )

  //   await sendBytes(device, verticalSliceImage(imageData, imageWidth, y, dpi))
  //   await sendBytes(device, new Uint8Array([LF]))
  // }

  // await setLineSpacing(device, 150)
  // await sendBytes(device, new Uint8Array([LF, LF]))
  // await sendBytes(device, new Uint8Array(PAPER_FULL_CUT))
  await sendText(device, 'abcd')
  await sendBytes(device, imageData)
  
}
//@ts-ignore
export function verticalSliceImage (img, imageWidth, yOffset, dpi) {
  const bytesPerSlice = dpi / 8
  const ret = new Uint8Array(imageWidth * bytesPerSlice).fill(0)

  for (let x = 0; x < imageWidth; x++) {
    for (let byte = 0; byte < bytesPerSlice; byte++) {
      for (let y = byte * 8 + yOffset; y < byte * 8 + 8 + yOffset; y++) {
        const setBitValue = 1 << (7 - y % 8)
        ret[x * bytesPerSlice + byte] |= img[y][x] ? setBitValue : 0
      }
    }
  }
  return ret
}
