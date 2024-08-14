import { NextResponse } from 'next/server';
const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

export async function GET(req: Request) {
  try {
    await initializeMoralis();

    const address = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';
    const chain = EvmChain.ETHEREUM;
    const response = await Moralis.EvmApi.token.getTokenPrice({
      address,
      chain,
    });

    const price = response.toJSON().usdPrice;

    return NextResponse.json({ price });
  } catch (error) {
    console.error('Error fetching token price:', error);
    return NextResponse.json({ error: 'Failed to fetch token price' }, { status: 500 });
  }
}

async function initializeMoralis() {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.NEXT_PUBLIC_MORALIS,
    });
  }
}
