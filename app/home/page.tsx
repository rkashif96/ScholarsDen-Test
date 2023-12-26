"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import MyButton from '../components/MyButton';
import axios from '../lib/axios';
import { useRouter } from 'next/navigation';
import MyTextField from '../components/MyTextField';
import MySearchableDropdown from '../components/MySearchableDropdown';
import MyTable from '../components/MyTable';

interface FormData {
    country: any
}
const initialDropdownValues: string[] = []
const Home = () => {
    const router = useRouter();
    const [countriesDropDown, setCountriesDropDown] = useState<string[]>(initialDropdownValues);
    const [countries, setCountries] = useState<any[]>(initialDropdownValues);
    const [country, setCountry] = useState<any[]>(initialDropdownValues);
    const [posts, setPosts] = useState<any[]>(initialDropdownValues);

    const [formData, setFormData] = useState<FormData>({
        country: {}
    });
    useEffect(() => {
        try {
            axios.get('/country').then(res => {
                if (res.data.status == 200) {
                    let updatedcountriesDropDown = res.data.obj.countries.map((country: any) => {
                        return country.name.common;
                    })
                    setCountriesDropDown(updatedcountriesDropDown);
                    setCountries(res.data.obj.countries)
                    setPosts(res.data.obj.exchanges)
                }
                else {
                    router.push('/login')
                }
            })
        } catch (error) {
            console.error('Error fetching Data:', error);
        }
    }, [])

    const handleDropDownChange = (e: ChangeEvent<HTMLInputElement>) => {
        let tempCountry = countries.find((country: any) => {
            return country.name.common == e
        })
        setCountry(tempCountry)
        setFormData({
            ...formData,
            ['country']: tempCountry,
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleDelete = (id: any) => {
        axios.delete(`/country?id=${id}`).then(res => {
            setPosts(posts.filter(post => post._id !== id));
        }).catch(err => {
            console.log(err)
        })

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/country', formData).then((res) => {
            let updatedposts = [...posts]
            updatedposts.push(res.data.obj)
            setPosts(updatedposts)

        }).catch(err => {
            console.log(err)
        })
    };
    return (
        <div className="container mt-5 py-8">
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-3/4 mx-auto">
                        <h1 className="mb-4 text-2xl font-bold text-center">EURO EXCHANGE</h1>

                        <div className="mb-4">
                            <MySearchableDropdown
                                label={"Country"}
                                options={countriesDropDown}
                                setOptions={setCountriesDropDown}
                                onSelect={handleDropDownChange}
                            />
                        </div>

                        <div className="mb-4">
                            <MyTextField
                                label="Amount"
                                type="text"
                                placeholder="Enter your amount"
                                name="amount"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex items-center justify-center">
                            <MyButton id="addExchangeButton" type="submit" text="Search" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" />
                        </div>
                    </form>
                </div>
            </div>

            <div className="mt-8">
                <MyTable posts={posts} onDelete={handleDelete} />
            </div>
        </div>

    );
};

export default Home;
