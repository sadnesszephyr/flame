import { Schema, ZodSchema, z } from 'zod'

interface EndpointOptions<DataType> {
	schema: ZodSchema<DataType>
	handler: (data: DataType) => any
}

class Endpoint<DataType> {
	public schema: ZodSchema<DataType>
	public handler: (data: DataType) => any

	constructor({ schema, handler }: EndpointOptions<DataType>) {
		this.schema = schema
		this.handler = handler
	}
}

export function makeEndpoint<DataType>(options: EndpointOptions<DataType>) {
	return new Endpoint(options)
}

const endpoint = makeEndpoint({
	schema: z.object({ name: z.string() }),
	handler(data) {
		console.log(data)
		return {
			test1: 'test1',
		}
	},
})

const endpoint2 = makeEndpoint({
	schema: z.object({ name2: z.string() }),
	handler(data) {
		console.log(data)
		return {
			test2: 'test2',
		}
	},
})