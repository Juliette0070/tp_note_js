import { PERSONNAGES } from '../config.js';

export default class Provider {
    static fetchPersonnages = async () => {
        try {
            const response = await fetch(`${PERSONNAGES}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching users', error);
        }
    }
    static fetchPersonnage = async (id) => {
        try {
            const response = await fetch(`${PERSONNAGES}/${id}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching user', error);
        }
    }
}