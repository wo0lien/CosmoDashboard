import type {PageServerLoad, Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {Api} from 'nocodb-sdk'
import 'dotenv/config'

const api = new Api({
    baseURL: process.env.DB_URL,
    headers: {
        'xc-token': process.env.DB_API_KEY
    }
})

export const load: PageServerLoad = async ({cookies}) => {
    const user_cookie = cookies.get('volunteer_email');

    if (user_cookie) {
        const user = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Email'],
            where: '(Email,eq,' + user_cookie + ')'
        })
        if (user) {
            throw redirect(303, '/events')
        }
    }

    return null;
};

export const actions = {
    login: async ({cookies, request, url}) => {
        const data = await request.formData();
        const email = data.get('email');

        if (!email) {
            return fail(400, {email, missing: true});
        }

        const user = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Email'],
            where: '(Email,eq,' + email.toString() + ')'
        })

        // @ts-ignore
        if (!user.Email) {
            return fail(400, {email, incorrect: true});
        }

        let exp_date = new Date()
        exp_date.setDate(Date.now()+3091200)

        cookies.set('volunteer_email', email.toString(), {maxAge: Date.now()+3091200, secure: false, path: '/'}); //TODO : secure false only for dev purpose

        throw redirect(303, '/events')

    },
} satisfies Actions;