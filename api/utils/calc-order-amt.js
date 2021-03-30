"use strict";

const inventory = {
    solarTiles: {
        name: "Solar Tiles",
        unitAmt: 10000 * 100, // Mult by 100 cents since Stripe stores prices by the lowest denomination of currency
    },
    solarPanels: {
        name: "Solar Panels",
        unitAmt: 2500 * 100
    },
    batteryPack: {
        name: "Battery Pack",
        unitAmt: 6000 * 100
    }
};

function calcOrderAmt(itemsInfoArr) {
    const calculatedTotal = itemsInfoArr.reduce((total, curr) => console.log(`Total is: ${total}, current item is: ${curr}`));

    // const finishedLineItems = itemsInfoArr.map(item => {
    //     const currItem = inventory[item.name];

    //     return {
    //         price_data: {
    //             currency: "usd",
    //             product_data: {
    //                 name: currItem.name
    //             },
    //             unit_amount: currItem.unitAmt
    //         },
    //         quantity: item.qty // Get qty. from front-end
    //     };
    // });

    // return finishedLineItems;
}

module.exports = { calcOrderAmt };