export const errorTravelForm = {
    title: {
        required: 'Un titre est requis',
        sentenceLength: 'Le titre ne doit pas dépasser 50 charactères',
        character: 'Le titre ne doit pas contenir de charactères spéciaux'
    },
    activityType: {
        required: 'Un type d\'activité est requis',
        sentenceLength: 'Le type de l\'activité ne doit pas dépasser 100 charactères'
    },
    dificulty: {
        required: 'Une difficulté est requise',
    },
    description: {
        required: 'Une description est requise'
    },
    address: {
        required: 'Une adresse est requise',
        sentenceLength: 'L\'adresse ne doit pas dépasser 100 charactères'
    },
    difficulty: {
        required: 'Une diffculté est requise'
    }
}

export const errorSinginForm = {
    email: {
        required: 'Un mail est requis',
        character: 'Le mail est invalide'
    },
    password:{
        required: 'Un mot de passe est requis'
    }
}