import { reset, setCharacterStyle, printImage } from '@/utils/driver/driver'

//@ts-ignore
export async function claimInterface (device) {
  for (const config of device.configurations) {
    for (const iface of config.interfaces) {
      if (!iface.claimed) {
        await device.claimInterface(iface.interfaceNumber)
        return true
      }
    }
  }
  return false
}
//@ts-ignore
export function setupPrinter () { 
  navigator.usb.requestDevice({
      filters: []
    })
    //@ts-ignore
    .then(async (device) => {
        //@ts-ignore
      window.device = device
      if (device.opened === false) {
        await device.open()
      }
      await claimInterface(device)
      //@ts-ignore
    }).catch(e => console.log('setup printer error:', e))
}
//@ts-ignore
export async function processPrint (imageData) {
    //@ts-ignore
  const devices = await navigator.usb.getDevices()
  if (devices.length) {
    //@ts-ignore
    let d = window.device
    if (d === undefined) {
        //@ts-ignore
      d = devices.find(device => device.manufacturerName.includes('printer'))
      d = (d !== undefined) ? d : devices[0]
    }
    if (d.opened === false) {
      await d.open()
    }
    // const d = device[0]
    await claimInterface(d)
    await reset(d)
    await setCharacterStyle(d, {
      smallFont: false,
      emphasized: false,
      underline: false,
      doubleWidth: false,
      doubleHeight: false
    })
    // const newHeight = Math.floor(imageData.length / 24) * 24;
    // console.log('height', newHeight, imageData)
    await printImage(d, imageData, 24)
  }
}

export async function detectedPrinter () {
    //@ts-ignore
  const devices = await navigator.usb.getDevices()
  return (devices.length !== 0)
}




