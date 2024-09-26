import type { Package } from "@/types/package";
import axios from 'axios';

export type Packages = (
    Package[]
);

export async function fetchPackages() : Promise<Packages> {
    try {
        const response = await axios.get('http://localhost:8080/packages');
        const packages: Packages = response.data;
        return packages;
    } catch(error) {
        throw new Error(`Error fetching packages: ${error}`);
    }
}