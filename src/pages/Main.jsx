import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Main() {
    const [listCurrency, setListCurrency] = useState([])

    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()

    const [currency, setCurrency] = useState()
    const [convertCurrency, setConvertCurrency] = useState()

    const getCurrency = async () => {
        return await axios.get('https://currency-exchange.p.rapidapi.com/listquotes', {
            headers: {
                'X-RapidAPI-Key': 'e311b47017msh5ee4ad54f163616p1eb299jsn12deb5b0411b',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        }).then(res => {
            setListCurrency(res?.data)
        }).catch(err => {
            console.log(err);
        })

    }
    const handleConvert = async (e) => {
        e.preventDefault()
        return axios.get('https://currency-exchange.p.rapidapi.com/exchange', {
            params: {
                from: fromCurrency,
                to: toCurrency,
                q: '1.0'
            },
            headers: {
                'X-RapidAPI-Key': 'e311b47017msh5ee4ad54f163616p1eb299jsn12deb5b0411b',
                'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
            }
        }).then(res => {
            setConvertCurrency(res?.data)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        getCurrency()
    }, [])
    return (
        <>
            <div className="grid place-content-center h-screen">
                <main className='text-center container px-5'>
                    <h1 className='text-[35px] lg:text-[70px] font-semibold'>Always get the real exchange rate</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, cum ipsum quia, suscipit dolor dolore.</p>

                    <div className="flex justify-center mt-5">
                        <section className='md:w-1/2'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3" >
                                <div className="col">
                                    <select name="" id="" className='w-full border p-3' onChange={e => setFromCurrency(e.target.value)}>
                                        <option value="">From Currency</option>
                                        {
                                            listCurrency?.map((data, i) => (
                                                <option value={data} key={i}>
                                                    {data}
                                                </option>
                                            ))
                                        }
                                    </select>

                                    <input type="number" className='mt-5 border py-4 outline-none text-[40px] w-full' value={currency} onChange={e => setCurrency(e.target.value)} min={0} />
                                </div>
                                <div className="col">
                                    <select name="" id="" className='w-full border p-3' onChange={e => setToCurrency(e.target.value)}>
                                        <option value="">To Currency</option>

                                        {
                                            listCurrency?.map((data, i) => (
                                                <option value={data} key={i}>
                                                    {data}
                                                </option>
                                            ))
                                        }
                                    </select>
                                    <input type="number" className='mt-5 border py-4 outline-none text-[40px] w-full' value={convertCurrency} onChange={e => setConvertCurrency(e.target.value)} readOnly />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button className='bg-pink-400 text-white px-7 py-3 font-bold rounded-lg' onClick={handleConvert}>Convert</button>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    )
}
