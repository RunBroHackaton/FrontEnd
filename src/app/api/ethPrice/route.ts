import { NextResponse } from 'next/server';
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

// Ensure to properly export the GET handler
export async function GET(req: Request) {
  try {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS,
    });
    
    const address = '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599';
    const chain = EvmChain.ETHEREUM;
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
    });

    const price = response.toJSON().usdPrice;

    // Return the price as a JSON response
    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json({ error: 'Failed to fetch token price' }, { status: 500 });
  }
}
