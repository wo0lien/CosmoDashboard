import type {PageServerLoad, Actions} from './$types';
import {fail, redirect} from "@sveltejs/kit";
import {Api} from 'nocodb-sdk'
import * as moment from 'moment-timezone'
import {formatPostcssSourceMap} from "vite";

const api = new Api({
    baseURL: 'https://nocodb.benevoles.cosmolyon.com:443',
    headers: {
        'xc-token': 'SGMexfJH5IJuJpbaoDgBpgN6E9eGi7kvRYe79Q8M'
    }
})

// @ts-ignore
export const load: PageServerLoad = async ({cookies, url}) => {

    const user_cookie = cookies.get('volunteer_email');

    if (user_cookie) {
        const user = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Email'],
            where: '(Email,eq,' + user_cookie + ')'
        })

        if (!user) {
            throw redirect(303, '/')
        }

        const events = await api.dbTableRow.list('v1', 'p1d5e0hzwz1r39a', 'Events', {
            where: '(Start,ge,today)',
            sort: 'Start',
        });

        //console.log(events.list[0])

        for (const value of events.list) {
            //formats start and end event dates
            // @ts-ignore
            value.Start = formatDateWithTimezone(value.Start)
            // @ts-ignore
            value.End = formatDateWithTimezone(value.End)

            // @ts-ignore
            value.Volunteers = []

            // @ts-ignore
            value.isRegistered = false

            // get the volunteer info
            //TODO à optimiser

            // @ts-ignore
            for (const volunteer of value.nc_curg___nc_m2m_w5i3lbdpwrs) {
                const volunteers_list = await api.dbTableRow.list('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
                    fields: ['Firstname', 'Lastname', 'Email'],
                    sort: 'Id',
                    // @ts-ignore
                    where: '(Id,eq,' + volunteer.table2_id + ')'
                });

                // @ts-ignore
                const volunteers_name = volunteers_list.list
                // @ts-ignore
                const volunteers_name_corrected = volunteers_name[0].Firstname + ' ' +volunteers_name[0].Lastname.slice(0,1) + '. '

                // @ts-ignore
                if (volunteers_name[0].Email === user_cookie){
                    // @ts-ignore
                    value.isRegistered = true
                }

                // @ts-ignore
                value.Volunteers.push(volunteers_name_corrected)
            }

        }

        return {upcoming_events: events.list}
    }

    throw redirect(303, '/');
};

export const actions = {
    logout: async ({cookies, request, url}) => {
        cookies.delete('volunteer_email')
        throw redirect(303, '/')
    },
    register: async ({cookies, request, url}) =>{
        const data = await request.formData();
        const event_id = data.get('event_id');

        console.log(event_id)
        console.log('yo je veux enregstrert pour' + event_id)

        const user_email = cookies.get('volunteer_email');

        const user_id = await api.dbTableRow.findOne('v1', 'p1d5e0hzwz1r39a', 'Volunteers', {
            fields: ['Id'],
            where: '(Email,eq,' + user_email + ')'
        })

        const registered_volunteers = await api.dbTableRow.list('v1', 'p1d5e0hzwz1r39a', 'Events', {
            fields: ['nc_curg___nc_m2m_w5i3lbdpwrs'],
            where: '(Id,eq,'+event_id+')',
        });
        console.log(registered_volunteers)


        if (typeof event_id === "string") {
            // @ts-ignore
            await api.dbTableRow.nestedAdd('v1', 'p1d5e0hzwz1r39a', 'Events', parseInt(event_id), 'mm', 'Volunteers', user_id.Id);
        }else{
            console.log("fail")
            return fail(500)
        }

        return { registerSuccess: true }
    },
} satisfies Actions;

// Define a function to format the date
function formatDateWithTimezone(inputDate: string): string {
    try {
        // Parse the input date string assuming it's in the format "YYYY-MM-DD HH:MM:SS+TZ:TZ"
        const zone = moment.tz.zonesForCountry('FR');
        const parsedDate = moment.utc(inputDate).tz(zone[0]);

        // Format the date as "DD-MM-YYYY HH:MM" with the time zone
        const outputFormat = "DD/MM/YYYY HH:mm";
        const formattedDate = parsedDate.format(outputFormat);

        return formattedDate;
    } catch (error) {
        return "Invalid date format. Please use 'YYYY-MM-DD HH:MM:SS+TZ:TZ'.";
    }
}

