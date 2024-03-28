import { PERSONNAGES, BAGUETTES, ANIMAUX, OBJETS, SORTS } from '../config.js';

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
            const responsePerso = await fetch(`${PERSONNAGES}/${id}`);
            const json = await responsePerso.json();
            if (json.baguette_magique_id && json.baguette_magique_id != null) {
                const responseBaguette = await fetch(`${BAGUETTES}/${json.baguette_magique_id}`);
                const jsonBaguette = await responseBaguette.json();
                json.baguette = jsonBaguette;
            }
            if (json.animal && json.animal != null) {
                const responseAnimal = await fetch(`${ANIMAUX}/${json.animal_id}`);
                const jsonAnimal = await responseAnimal.json();
                json.animal = jsonAnimal;
            }
            // if (json.objet && json.objet.length > 0) {
            //     json.objet.map(async (objet) => {
            //         const responseObjet = await fetch(`${OBJETS}/${objet.id}`);
            //         const jsonObjet = await responseObjet.json();
            //         objet = jsonObjet;
            //     });
            // }
            // if (json.sort && json.sort.length > 0) {
                // json.sort.map(async (sort) => {
                    // const responseSort = await fetch(`${SORTS}/${sort.id}`);
                    // const jsonSort = await responseSort.json();
                    // sort = jsonSort;
                // });
            // }
            return json;
        } catch (error) {
            console.error('Error fetching user', error);
            return;
        }
    }
}