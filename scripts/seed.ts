import { normalizeData as getNormalizedData, readCSV } from "@/app/utils/readcsv"
import { addClients, csvState, csvStateInsert, truncateCsv } from "@/dbscripts/runtime"

export async function seed() {
  await createClientsDB()
}

async function createClientsDB(attempts: number = 3): Promise<void> {
  if (attempts > 0) {
    const csvCurrentState = await csvState()

    if (!csvCurrentState) {
      try {
        const data = await readCSV()
        const keys: string[] = data[0] as string[]
        const normalizeData = getNormalizedData(data.slice(1), keys.slice(1))
        await truncateCsv()
        await addClients(normalizeData)
        await csvStateInsert()
      } catch (e) {
        await truncateCsv()
        const nextAttemts = attempts - 1
        await createClientsDB(nextAttemts)
      }
    }
  }
}
(async () => {
    try {
        const text = await seed();
        console.log(text);
    } catch (e) {
        // Deal with the fact the chain failed
    }
    // `text` is not available here
})();
