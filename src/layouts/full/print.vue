
//@ts-ignore
async function connectPrinter(filters) {
    if (filters.length == 0) {
        return undefined;
    }

    const devices = await navigator.usb.getDevices();
    console.log('devices', devices)
    for (const a of filters) {
        const device = devices.find(
            (device) =>
            //@ts-ignore
                device.vendorId == parseInt(Number(a.vendorId), 10) &&
                //@ts-ignore
                device.productId == parseInt(Number(a.productId), 10)
        );
        if (device) {
            return device;
        }
    }

    const device = await navigator.usb.requestDevice({
        filters: filters,
    });
    console.log('list device', device)
    return device;
};
async function setupPrinter(clicked:any) {
    if (!navigator.usb) {
        return new Promise((resolve, reject) => {
            reject("USB not supported");
        });
    }
    // if ($scope.printerConfig.listPrintBillId.length === 0) {
    // 	swal("Máy in đơn chưa được cài đặt", {
    // 		icon: "info",
    // 		timer: 2000,
    // 	});
    // 	return new Promise((resolve, reject) => {
    // 		reject("Receipt printer not setup");
    // 	});
    // }
    // printerConfig.listPrintBillId.map((a) => {
    
    const listFilter = [ 
        // {vendorId: 1155, productId: 22304 },
        {vendorId: 4070, productId: 33054}
    ];
    // vendor=8137 "XPrinter ", product=8214 
    // vendorId: "4070",productId: "33054",
    // listFilter.push({
    //     vendorId: "4070",
    //     productId: "33054",
    // });
    const printerBill = await connectPrinter(listFilter);
    console.log('test print', printerBill)
    // if (clicked === 1) {
    //     if (printerBill) {
    //         console.log("Máy in đơn đã được kết nối");
    //     } else {
    //         console.log("Kết nối máy in thất bại");
    //     }
    // }
    return new Promise((resolve, reject) => {
        resolve(printerBill);
    });
};
// async function claimInterface(device:any) {
// 					for (const config of device.configurations) {
// 						for (const iface of config.interfaces) {
// 							if (!iface.claimed) {
// 								await device.claimInterface(iface.interfaceNumber);
// 								return true;
// 							}
// 						}
// 					}
// 					return false;
// 				}

// /**
//  * Select an endpoint from the currently selected configuration by direction
//  * @param direction 'out' or 'in'
//  * @param device the connected USBDevice
//  */
//     function selectEndpoint(direction:any, device:any) {
//     const endpoint =
//         device.configuration.interfaces[0].alternate.endpoints.find(
//             (ep:any) => ep.direction === direction
//         );

//     if (endpoint == null) {
//         throw new Error(
//             `Endpoint ${direction} not found in device interface.`
//         );
//     }
//     return endpoint;
// }
// async function sendBytes(device:any, bytes:any) {
//     const endpoint = selectEndpoint("out", device);
//     // console.log('check sendText: ', endpoint)
//     const t = await device.transferOut(endpoint.endpointNumber, bytes);
//     return t;
// }
// async function reset(device:any) {
//     await sendBytes(device, new Uint8Array([ESC, 0x40]));
// }
// async function setCharacterStyle(
// 					device,
// 					style
// 					// style: {
// 					//   smallFont;
// 					//   emphasized?: boolean;
// 					//   doubleHeight?: boolean;
// 					//   doubleWidth?: boolean;
// 					//   underline?: boolean;
// 					// } = {}
// 				) {
// 					let v = 0;

// 					if (style.smallFont) {
// 						v |= 1 << 0;
// 					}

// 					if (style.emphasized) {
// 						v |= 1 << 3;
// 					}

// 					if (style.doubleHeight) {
// 						v |= 1 << 4;
// 					}

// 					if (style.doubleWidth) {
// 						v |= 1 << 5;
// 					}

// 					if (style.underline) {
// 						v |= 1 << 7;
// 					}

// 					await sendBytes(device, new Uint8Array([ESC, 0x21, v]));
// 				}
// async function processPrint(device:any, imageData:any) {
// 					console.log('imageddddddd', imageData, device)
// 					if (!navigator.usb) {
// 						return;
// 					}

// 					try {
// 						if (device === undefined) {
// 							// swal("Máy in chưa được kết nối", {
// 							// 	icon: "error",
// 							// 	timer: 2000,
// 							// });
// 							return Promise.reject("Máy in bill chưa được kết nối");
// 						}

// 						if (device.opened === false) {
// 							await device.open();
// 						}
// 						await claimInterface(device);
// 						await reset(device);
// 						await setCharacterStyle(device, {
// 							smallFont: false,
// 							emphasized: false,
// 							underline: false,
// 							doubleWidth: false,
// 							doubleHeight: false,
// 						});
// 						await printImage(device, imageData, 24);
// 					} catch (e) {
// 						console.log("#processPrint error", e);
// 						throw e;
// 					}
// 				}

var detectedPrinterS;
//--end print new
detectedPrinter().then((detected) => {
    detectedPrinterS = detected;
    console.log('detect print', detected)
});
// Convert dom to image function


//@ts-ignore
async function printImage(device, imageData, dpi) {
    await setLineSpacing(device, dpi);
    const imageWidth = imageData[0].length;
    const mode = dpi === 8 ? EIGHT_DOT_DENSITY : TWENTY_FOUR_DOT_DENSITY;

    if (imageData.length % dpi !== 0) {
        throw new Error(
            `Image height must be divisible by ${dpi} currently is ${imageData.length}`
        );
    }
    for (let y = 0; y < imageData.length; y += dpi) {
        await sendBytes(
            device,
            new Uint8Array([
                ESC,
                0x2a,
                mode,
                0x00ff & imageWidth, // nL low byte,
                (0xff00 & imageWidth) >> 8, // nH height byte
            ])
        );
        await sendBytes(
            device,
            verticalSliceImage(imageData, imageWidth, y, dpi)
        );
        await sendBytes(device, new Uint8Array([LF]));
    }
    await setLineSpacing(device, 150);
    await sendBytes(device, new Uint8Array([LF, LF]));
    await sendBytes(device, new Uint8Array(PAPER_FULL_CUT));
    await sendBytes(device, new Uint8Array(CASH_DRAWER_KICK_2));
}



/**
 * Select an endpoint from the currently selected configuration by direction
 * @param direction 'out' or 'in'
 * @param device the connected USBDevice
 */
function selectEndpoint(direction:any, device:any) {
    const endpoint =
        device.configuration.interfaces[0].alternate.endpoints.find(
            (ep:any) => ep.direction === direction
        );

    if (endpoint == null) {
        throw new Error(
            `Endpoint ${direction} not found in device interface.`
        );
    }
    return endpoint;
}
async function sendBytes(device:any, bytes:any) {
    const endpoint = selectEndpoint("out", device);
    console.log('check sendText: ', endpoint)
    const t = await device.transferOut(endpoint.endpointNumber, bytes);
    return t;
}
//@ts-ignore
async function processPrintWithEncoder( device,imageData,width,height,transType) {
    if (!navigator.usb) {
        return;
    }

    try {
        if (device === undefined) {
            // swal("Máy in chưa được kết nối", {
            //     icon: "error",
            //     timer: 2000,
            // });
            return Promise.reject("Máy in bill chưa được kết nối");
        }

        if (device.opened === false) {
            await device.open();
        }

        await claimInterface(device);
        //@ts-ignore
        const encoder = new EscPosEncoder();
        // console.log('check trans type: ', transType)
        // if (transType == trans_cash) {
        const data = encoder
            // .initialize()
            // .image(imageData, width, height, "threshold", 210)
            // .raw([0x0a, 0x0a, 0x0a, 0x0a, 0x0a, 0x0a])
            // .cut("full")
            // .pulse(0, 100, 500)
            .image(imageData, 320, 320, 'atkinson')
            .encode();
        await sendBytes(device, imageData);
        // } else {
            // const data = encoder
            //     .initialize()
            //     .image(imageData, width, height, "threshold", 210)
            //     .raw([0x0a, 0x0a, 0x0a, 0x0a, 0x0a, 0x0a])
            //     .cut("full")
            //     .encode();
            // await sendBytes(device, data);
        // }
        // await reset(device)
        // await setCharacterStyle(device, {
        // 	smallFont: false,
        // 	emphasized: false,
        // 	underline: false,
        // 	doubleWidth: false,
        // 	doubleHeight: false
        // })
        // await printImage(device, imageData, 24)
    } catch (e) {
        console.log("#processPrint error", e);
        throw e;
    }
}

const transType = 41
async function printBillJS(device:any, transType:any) {
    //@ts-ignore
    // html2canvas($("#printDefault")[0], {
    //             scale: 1,
    //             useCORS: true,
    // }).then((canvas:any) => {
    //             const paperWidth = canvas.width;
    //             const paperHeight =
    //                 canvas.height % 8 !== 0
    //                     ? (Math.round(canvas.height / 8) + 1) * 8
    //                     : canvas.height;
    //             // const paperHeight = (canvas.height % 24 !== 0) ? (Math.round(canvas.height / 24) + 1) * 24 : canvas.height
    //             createImageBitmap(canvas).then((bitmap) => {
    //                 console.log('bitmap',bitmap)
    //                 //@ts-ignore
    //                 processPrintWithEncoder(
    //                     device,
    //                     bitmap,
    //                     paperWidth,
    //                     paperHeight,
    //                 );
    //             });
    // });

    ////////////////////////
    setupPrinter()
    //@ts-ignore
    html2canvas($("#printDefault")[0], { scale: 2, useCORS: true }).then(async (canvas:any) => {
        const paperWidth = canvas.width
        const paperHeight = (canvas.height % 24 !== 0) ? (Math.round(canvas.height / 24) + 1) * 24 : canvas.height
        // const ctx = canvas.getContext('2d')
        // const canvasData = ctx.getImageData(0, 0, paperWidth, paperHeight)
        // const imageData = [] as any
        // for (let y = 0; y < paperHeight; y++) {
        //   imageData.push([])
        //   for (let x = 0; x < paperWidth; x++) {
        //     const idx = y * (paperWidth * 4) + x * 4
        //     const r = canvasData.data[idx]
        //     const g = canvasData.data[idx + 1]
        //     const b = canvasData.data[idx + 2]
        //     const alpha = canvasData.data[idx + 3]
        //     imageData[y][x] = alpha !== 0 && (r < 255 || g < 255 || b < 255) ? 1 : 0
        //   }
        // }

        console.log(canvas.toDataURL())
        //@ts-ignore
        // await sendBytes(device, imageData)
        processPrintWithEncoder(
            device,
            canvas,
            paperWidth,
            paperHeight,
        )
      })
}

///////////////////////////////////////////////////////////////////
async function printbills() {
     // //@ts-ignore
    //  setupPrinter(1)
    // sendImageToUSBPrinter()
    const filter = [
        {vendorId: 8137, productId: 8214 },
        {vendorId: 4070, productId: 33054}
    ]
    const devices = await setupPrinter(1)
    console.log(devices)
    printBillJS(devices, 0)
    // const devices = await navigator.usb.getDevices();
    //@ts-ignore
    // for (let index = 0; index < devices?.length; index++) {
    //     //@ts-ignore   
    //     const device = devices[index]
    //     printBillJS(device, 0)
    // }
    
    
}