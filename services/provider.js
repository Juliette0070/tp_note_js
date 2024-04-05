import { PERSONNAGES, BAGUETTES, ANIMAUX, OBJETS, SORTS } from '../config.js';
import DetailPerso from '../view/DetailPerso.js';

export default class Provider {
    static fetchPersonnages = async (page=-1, limit=-1) => {
        try {
            let json = {};
            if (page >= 0 && limit >= 0) {
                let response = await fetch(`${PERSONNAGES}?_page=${page}&_per_page=${limit}`);
                const jsonTemp = await response.json();
                json = jsonTemp.data;
            } else {
                let response = await fetch(`${PERSONNAGES}`);
                json = await response.json();
            }
            console.log(json);
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
    static updatePersonnage = async (perso) => {
        try {
            const { id, nom, age, niveau, xp, maison, baguette_magique_id, animal_id, objets_ids, sorts_ids, image } = perso;
            const body = JSON.stringify({ id, nom, age, niveau, xp, maison, baguette_magique_id, animal_id, objets_ids, sorts_ids, image });

            const response = await fetch(`${PERSONNAGES}/${perso.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error updating personnage', error);
            return;
        }
    }
    static fetchSorts = async () => {
        try {
            const response = await fetch(`${SORTS}`);
            const json = await response.json();
            return json;
        } catch (error) {
            console.error('Error fetching sorts', error);
        }
    }
}