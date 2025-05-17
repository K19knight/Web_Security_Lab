import React, {useState, useEffect} from "react";
import {BsArrowDown, BsArrowUp} from "react-icons/bs";
import {toast} from "react-toastify";

const formatDateForInput = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 10);
};

const FilterRooms = ({onFiltersChange, onSortChange}) => {
    const [filters, setFilters] = useState({
        start: "",
        end: "",
        guests: "",
        size: "",
        pricePerOneNight: ""
    });

    const todayDate = new Date().toISOString().split('T')[0];
    const getNextDay = (dateStr) => {
        if (!dateStr) return todayDate;
        const date = new Date(dateStr);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    const minEndDate = getNextDay(todayDate);

    const [sortByDesc, setSortByDesc] = useState(true);

    useEffect(() => {
        const savedParams = localStorage.getItem("roomSearchParams");
        if (savedParams) {
            try {
                const parsed = JSON.parse(savedParams);
                setFilters({
                    start: formatDateForInput(parsed.start),
                    end: formatDateForInput(parsed.end),
                    guests: parsed.guests || "",
                    size: parsed.size || "",
                    pricePerOneNight: parsed.pricePerOneNight || ""
                });
            } catch (e) {
                console.error("Nieprawidłowe dane w localStorage.roomSearchParams");
            }
        }
    }, []);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateFilters = () => {
        const {start, end, guests} = filters;

        if (!start || !end || !guests) {
            toast.error("Data rozpoczęcia, zakończenia i liczba gości są wymagane.");
            return false;
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        if (startDate >= endDate) {
            toast.error("Data rozpoczęcia musi być wcześniejsza niż zakończenia.");
            return false;
        }

        return true;
    };

    const handleApplyFilters = () => {
        if (!validateFilters()) return;

        const parsedFilters = {
            ...filters,
            guests: filters.guests ? parseInt(filters.guests) : null,
            size: filters.size ? parseInt(filters.size) : null,
            pricePerOneNight: filters.pricePerOneNight ? parseInt(filters.pricePerOneNight) : null,
            start: filters.start ? new Date(filters.start).toISOString() : null,
            end: filters.end ? new Date(filters.end).toISOString() : null
        };

        onFiltersChange(parsedFilters);
    };

    const handleSortToggle = () => {
        const newSort = !sortByDesc;
        setSortByDesc(newSort);
        onSortChange(newSort);
    };


    return (
        <div className="filters">

            <div className="filters-content">
                <div className="filters-data">
                    <label>Data zameldowania:</label>
                    <div><input type="date" name="start" value={filters.start} onChange={handleChange} min={todayDate}/></div>

                    <label>Data wymeldowania:</label>
                    <div><input type="date" name="end" value={filters.end} onChange={handleChange} min={minEndDate}/></div>
                </div>

                <div className="filters-data">
                    <label>Liczba gości:</label>
                    <div><input type="number" name="guests" value={filters.guests} onChange={handleChange}/></div>

                    <label>Min. rozmiar pokoju:</label>
                    <div><input type="number" name="size" value={filters.size} onChange={handleChange}/></div>

                </div>
                <div className="filters-data">
                    <label>Maks. cena za noc:</label>
                    <div><input type="number" name="pricePerOneNight" value={filters.pricePerOneNight}
                                onChange={handleChange}/></div>
                    <button onClick={handleApplyFilters} className="filter-button">Zastosuj filtry</button>
                </div>
            </div>
            <div className="filters-action">
                <button onClick={handleSortToggle} className="sort-button">
                    {sortByDesc ? "Sortuj od najdroższych" : "Sortuj od najtańszych"}
                    {sortByDesc ? <BsArrowDown className="sort-button-icon"/> :
                        <BsArrowUp className="sort-button-icon"/>}
                </button>
            </div>
        </div>
    );
};

export default FilterRooms;
