export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    vin: string;
    mileage: number;
    description?: string;
    imageUrl?: string;
    isAvailable: boolean;
    pricePerDay: number;
    ownerId: string;
    createdAt: string;
}
