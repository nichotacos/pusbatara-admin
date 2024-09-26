import type { Donator } from '../src/types/donator';
import axios from 'axios';

export type Donators = (
    Donator[]
);

export async function fetchDonators() : Promise<Donators> {
    try {
        const response = await axios.get('http://localhost:8080/donators');
        const donators: Donators = response.data;
        return donators;
    } catch(error) {
        throw new Error(`Error fetching donators: ${error}`);
    }
}
