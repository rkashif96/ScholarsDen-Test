
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import Exchange from "@/app/models/exchangeModel.model"
import dbConnect from "@/app/lib/dbConnect"
const Response = (obj: any, status: any) => {
  return NextResponse.json({ obj, status })
}
const API_KEY = process.env.API_KEY!
let rates: any = {}
let exchanges: any = {}

export const POST = async (request: Request) => {
  try {
    await dbConnect()
    const { country, amount } = await request.json();
    const keys = Object.keys(country.currencies)
    const { symbol } = country.currencies[keys[0]]
    let exchangeRate = rates.rates[keys[0]]
    let exchange = await Exchange.create({
      country: country.name.common,
      amount,
      exchangedAmount: amount * exchangeRate,
      currency: symbol
    })
    return Response(exchange, 200)
  } catch (error: any) {
    console.error('Error fetching data:', error.message);
    throw error;
  }

}

export const GET = async (request: Request) => {
  try {
    await dbConnect()
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,currencies,population');
    const countries = await res.json();
    const res2 = await fetch(`http://data.fixer.io/api/latest?access_key=${process.env.API_KEY} `);
    rates = await res2.json();

    if (!res.ok) {
      return Response({ message: `HTTP error! Status: ${res.status}` }, 500);
    }
    if (!res2.ok) {
      return Response({ message: `HTTP error! Status: ${res.status}` }, 500);
    }
    exchanges = await Exchange.find()
    let obj = {
      countries,
      rates,
      exchanges
    }
    return Response(obj, 200)
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    await dbConnect()
    let searchParams = request.nextUrl.searchParams.get('id')
    const deletedPost = await Exchange.findByIdAndDelete(searchParams);
    if (deletedPost) {
      return Response(deletedPost, 200);
    } else {
      throw new Error("Post not found");
    }

  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

