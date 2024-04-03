import { PERSONNAGES, BAGUETTES, ANIMAUX, OBJETS, SORTS } from '../config.js';

export default class Provider {
    static fetchPersonnages = async (start=-1, limit=-1) => {
        try {
            let response = await fetch(`${PERSONNAGES}`);
            if (start >= 0 && limit >= 0) {
                response = await fetch(`${PERSONNAGES}?_start=${start}&_limit=${limit}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching users', error);
        }
    }
    static fetchPersonnage = async (id) => {
        try {
            const responsePerso = await fetch(`${PERSONNAGES}/${id}`);
            const json = await responsePerso.json();
            if (json.baguette_magique_id && json.baguette_magique_id != null) {
                const responseBaguette = await fetch(`${BAGUETTES}/${json.baguette_magique_id}`);
                const jsonBaguette = await responseBaguette.json();
                json.baguette = jsonBaguette;
            }
            if (json.animal_id && json.animal_id != null) {
                const responseAnimal = await fetch(`${ANIMAUX}/${json.animal_id}`);
                const jsonAnimal = await responseAnimal.json();
                json.animal = jsonAnimal;
            }
            if (json.objets_ids) {
                json.objets = [];
                for (let i = 0; i < json.objets_ids.length; i++) {
                    const responseObjet = await fetch(`${OBJETS}/${json.objets_ids[i]}`);
                    const jsonObjet = await responseObjet.json();
                    json.objets[i] = jsonObjet;
                }
            }
            if (json.sorts_ids) {
                json.sorts = [];
                for (let i = 0; i < json.sorts_ids.length; i++) {
                    const responseObjet = await fetch(`${SORTS}/${json.sorts_ids[i]}`);
                    const jsonObjet = await responseObjet.json();
                    json.sorts[i] = jsonObjet;
                }
            }
            return json;
        } catch (error) {
            console.error('Error fetching user', error);
            return;
        }
    }
}