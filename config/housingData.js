export const housingData = {
    house: {
        ranges: [
            { min: 0, max: 45, model: 'house-low.png', label: 'Basic House' },
            { min: 46, max: 65, model: 'house-medium.png', label: 'Eco House' },
            { min: 66, max: 85, model: 'house-high.png', label: 'Sustainable House' }
        ],
        baseScore: 0
    },
    loft: {
        ranges: [
            { min: 0, max: 45, model: 'loft-low.png', label: 'Basic Loft' },
            { min: 46, max: 65, model: 'loft-medium.png', label: 'Eco Loft' },
            { min: 66, max: 85, model: 'loft-high.png', label: 'Sustainable Loft' }
        ],
        baseScore: 0
    },
    apartment: {
        ranges: [
            { min: 0, max: 45, model: 'low-apartment.png', label: 'Basic Apartment' },
            { min: 46, max: 65, model: 'mid-apartment.png', label: 'Eco Apartment' },
            { min: 66, max: 85, model: 'low-apartment.png', label: 'Sustainable Apartment' }
        ],
        baseScore: 0
    }
};