import type {PageServerLoad, Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {Api} from 'nocodb-sdk'

const api = new Api({
    baseURL: 'https://nocodb.benevoles.cosmolyon.com',
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
        if (user) {
            throw redirect(303, '/events')
        }
    }

    console.log('pas de cookie')
    return null;
};

export const actions = {
    login: async ({cookies, request, url}) => {
        const data = await request.formData();
        const email = data.get('email');

        console.log('email saisi : ' + email)

        if (!email) {
            return fail(400, {email, missing: true});
        }

        const user = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Email'],
            where: '(Email,eq,' + email.toString() + ')'
        })
        console.log(user)

        // @ts-ignore
        if (!user.Email) {
            console.log('pas de user dans la db')
            return fail(400, {email, incorrect: true});
        }


        cookies.set('volunteer_email', email.toString());


        throw redirect(303, '/events')

    },
} satisfies Actions;