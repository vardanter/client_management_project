import { CLIENT_KEY_MAP, ClientMapType } from '@/constants'
import Papa from 'papaparse'
import fs from 'fs/promises'

export type ClientType = ClientMapType & {user_id: number, user_id_string: string}

export async function readCSV(): Promise<unknown[] | string[] | ClientType[]> {
    const bankClientCsv = await fs.readFile(`${__dirname}/files/bank_clients.csv`, {encoding: 'utf8'})
    const parsedData = Papa.parse(bankClientCsv, {delimiter: ','})
    if (!parsedData || parsedData.errors.length > 0) {
        throw new Error(parsedData.errors.toString())
    } else {
        return parsedData.data
    }
}

export const normalizeData = (data: any[], keys: string[]): ClientType[] => {
    return data.map((item: any[]): ClientType => {
        const itemJson: any = {}
        return item.reduce((_, itemValue, itemIndex: number) => {
            const key = keys[itemIndex - 1].endsWith('(%)') ? keys[itemIndex - 1].slice(0, -3) : keys[itemIndex - 1]
            itemJson[key] = itemValue
            if (key === 'user_id') {
                itemJson[key] = parseInt(itemValue)
                itemJson['user_id_string'] = `${itemValue}`
            }
            return itemJson
        })
    })
}
