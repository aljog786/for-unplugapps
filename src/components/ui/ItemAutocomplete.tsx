'use client'
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Item } from '../../types';
import { useItems } from '../../hooks/useItems';

interface ItemAutocompleteProps {
    value: string;
    field: 'item_code' | 'item_name';
    onSelect: (item: Item) => void;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

const ItemAutocomplete: React.FC<ItemAutocompleteProps> = ({
    value,
    field,
    onSelect,
    onChange,
    placeholder,
    className = ""
}) => {
    const { items, loading } = useItems();
    const [isOpen, setIsOpen] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredItems = isOpen || value.trim() !== '' 
        ? items.filter(item => item[field].toLowerCase().includes(value.toLowerCase()))
        : [];

    const updateCoords = () => {
        if (inputRef.current) {
            const rect = inputRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    };

    useEffect(() => {
        if (isOpen) {
            updateCoords();
            window.addEventListener('scroll', updateCoords, true);
            window.addEventListener('resize', updateCoords);
        }
        return () => {
            window.removeEventListener('scroll', updateCoords, true);
            window.removeEventListener('resize', updateCoords);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                // Check if the click was also outside the portal dropdown
                const portalDropdown = document.getElementById('autocomplete-portal');
                if (portalDropdown && !portalDropdown.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const suggestions = (
        <div
            id="autocomplete-portal"
            className="fixed z-9999 bg-white border border-slate-200 rounded-lg shadow-2xl max-h-60 overflow-y-auto"
            style={{
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                width: `${coords.width}px`,
                position: 'absolute' // Reverting to absolute relative to body if using scrollY
            }}
        >
            {filteredItems.map((item, index) => (
                <div
                    key={index}
                    onMouseDown={(e) => {
                        e.preventDefault(); // Prevent focus loss before selection
                        onSelect(item);
                        setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-yellow-50 cursor-pointer border-b border-slate-50 last:border-none transition-colors group"
                >
                    <div className="font-bold text-slate-800 group-hover:text-yellow-700">
                        {item.item_code}
                    </div>
                    <div className="text-sm text-slate-500">
                        {item.item_name}
                    </div>
                </div>
            ))}
            {loading && (
                <div className="p-4 text-center text-slate-500">
                    Loading items...
                </div>
            )}
        </div>
    );

    return (
        <div className="relative w-full" ref={containerRef}>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => {
                    onChange(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={() => setIsOpen(true)}
                placeholder={placeholder}
                className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-500/20 focus:border-yellow-500 transition-all ${className}`}
            />
            {isOpen && filteredItems.length > 0 && typeof document !== 'undefined' &&
                createPortal(suggestions, document.body)
            }
        </div>
    );
};

export default ItemAutocomplete;
