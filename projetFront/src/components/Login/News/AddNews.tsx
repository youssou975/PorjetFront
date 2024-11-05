// src/components/AddNews.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface News {
    url: string;
    titre: string;
    dateAjout: string;
}

const AddNews: React.FC = () => {
    const [news, setNews] = useState<News>({
        url: '',
        titre: '',
        dateAjout: ''
    });
    const [message, setMessage] = useState('');

    // Fonction pour gérer les changements dans le formulaire
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNews({
            ...news,
            [name]: value
        });
    };

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Récupérer le token JWT pour authentification

            // Envoyer la requête avec le token dans les en-têtes
            const response = await axios.post('http://localhost:5000/api/news/addNew', news, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('News ajoutée avec succès !');
            setNews({ url: '', titre: '', dateAjout: '' }); // Réinitialiser le formulaire
        } catch (error) {
            setMessage('Erreur lors de l’ajout de la news.');
        }
    };

    return (
        <div>
            <h2>Ajouter une News</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="url"
                    placeholder="URL"
                    value={news.url}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="titre"
                    placeholder="Titre"
                    value={news.titre}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="dateAjout"
                    placeholder="Date d'ajout (AAAA-MM-JJ)"
                    value={news.dateAjout}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddNews;
