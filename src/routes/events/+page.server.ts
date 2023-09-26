import type {PageServerLoad, Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {Api} from 'nocodb-sdk'

const api = new Api({
    baseURL: 'https://nocodb.benevoles.cosmolyon.com:443',
    headers: {
        'xc-token': 'SGMexfJH5IJuJpbaoDgBpgN6E9eGi7kvRYe79Q8M'
    }
})

export const load: PageServerLoad = async ({cookies}) => {
    console.log('cherche cookie')
    const user_cookie = cookies.get('volunteer_email');

    if (user_cookie) {
        console.log('cookie trouvé')
        const user = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Email'],
            where: '(Email,eq,' + user_cookie + ')'
        })
        console.log('user : ' + user)
        if (!user) {
           throw redirect(303, '/')
        }

        //TODO get les data des events en cours

        return null
    }

    console.log('pas de cookie')
    throw redirect(303, '/');
};

export const actions = {
    logout: async ({cookies, request, url}) => {
        cookies.delete('volunteer_email')
        throw redirect(303, '/')
    },
} satisfies Actions;