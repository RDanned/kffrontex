import moment from 'moment'
import countries from '@/lang/countries'
import regions from '@/lang/regions'

let default_format = 'DD-MM-YYYY HH:MM'
let genders = {
    male: 'Мужской',
    female: 'Женский'
}

export function date_format(date, format) {
    return moment(date).format(format)
}

export function date_default_format(date){
    return moment(date).format(default_format)
}

export function gender_formatter(gender_code){
    return genders[gender_code]
}

export function get_country_name(country_code, lang){
    let country = 'Не указано'
    if(countries[lang].find(item => item.code === country_code))
        country = countries[lang].find(item => item.code === country_code).name
    return country ? country : ''
}

export function get_region_name(region_code, lang){
    let region = 'Не указано'
    if(regions[lang].find(item => item.code === region_code))
        region = regions[lang].find(item => item.code === region_code).name
    return region ? region : ''
}