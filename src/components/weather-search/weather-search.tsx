import { useAtom } from "jotai";
import { ChangeEvent, FormEvent } from "react";
import { searchTermAtom } from "../../features/weather-initialstate";
import { getCoordinatesAtom, searchLocationAtom } from "../../features/weather-store";

import { MdMyLocation } from 'react-icons/md';
import style from './searchbar.module.scss';



export const WeatherSearch = () => {

    const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
    const [, getCoordinates] = useAtom(getCoordinatesAtom)
    const [, setSearchLocation] = useAtom(searchLocationAtom)


    const searchLocationHandler = (e: FormEvent) => {
        e.preventDefault();
        if (searchTerm === '') return
        setSearchLocation(searchTerm)
        setSearchTerm('');
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const location = e.target.value;
        setSearchTerm(location);
    };


    const getCoordinatesHandler = () => {

        // setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getCoordinates(position)
            }
        )
    }


    return (
        <form
            onSubmit={searchLocationHandler}
            className={`${style['form']}`}
        >
            <div className={`${style['form-content']}`}>
                <label htmlFor='search' className={`${style['label']}`}>
                    Search City
                </label>
                <div className={`${style['location-input']}`}>
                    <input
                        type='text'
                        name='search'
                        placeholder='e.g. Frankfurt'
                        onChange={onChangeHandler}
                        value={searchTerm}
                        className={`${style['input']}`}
                    />
                    <span>
                        <MdMyLocation
                            onClick={getCoordinatesHandler}
                            className={`${'pointer'} ${style['locator']}`}
                        />
                    </span>
                </div>
                <button className={`${style['btn']} ${'pointer'}`}>
                    Check Weather
                </button>
            </div>
        </form >
    );
};