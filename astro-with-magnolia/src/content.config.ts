import { defineCollection, z } from "astro:content";

const baseUrl = 'http://localhost:8080'

const tours = defineCollection({
    loader: async () => {
        const content = await fetch(`${baseUrl}/.rest/delivery/tours/v1`).then(res => res.json()) as {
            total: number,
            offset: number,
            limit: number,
            results: Array<any>
        }
        return content.results.map(entry => ({
            ...entry,
            id: entry["@id"],
            image: `${baseUrl}${entry.image["@link"]}`
        }))
    },
    schema: z.object({
        name: z.string(),
        description: z.string().optional(),
        body: z.string().optional(),
        duration: z.number().optional(),
        location: z.string().optional(),
        image: z.string().optional(),
        tourTypes: z.array(z.object({
                name: z.string(),
                displayName: z.string().optional(),
                description: z.string().optional()
        })).optional()
    })
})

export const collections = { tours }
