import { AiFillHome, AiFillTrophy } from "react-icons/ai";
import { RiCompassDiscoverFill, RiDashboardFill } from "react-icons/ri";

export const SidebarDataExternal = [
    {
        title: 'Accueil',
        icon: <AiFillHome />,
        link: '/',
    },
    {
        title: 'Découvrir',
        icon: <RiCompassDiscoverFill />,
        link: '/discover',
    },
    {
        title: 'Classements',
        icon: <AiFillTrophy />,
        link: '/ranking',
    },
    {
        title: 'Les 4 éléments',
        icon: <RiDashboardFill />,
        link: '/environment',
    },
    {
        title: 'Connexion',
        icon: <RiDashboardFill />,
        link: '/signin',
    }
]

export const SidebarDataInternal = [
    {
        title: 'Mes voyages',
        icon: '',
        link: '/travels',
        favourites: {
            title: 'Favoris',
            icon: '',
            link: '/travels/favourites'
        },
        liked: {
            title: 'Aimé',
            icon: '',
            link: '/travels/liked'
        }
    },
    {
        title: 'Dashboard',
        icon: '',
        link: '',
    },
    {
        title: 'Account',
        icon: '',
        link: '',
    }
]