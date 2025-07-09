import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { z } from 'zod';
import axios from 'axios';

const server = new McpServer({
	name: 'Correios API',
	version: '1.0.0'
});

server.registerTool(
	'get-address-by-cep',
	{
		title: 'Get Address by CEP',
		description: 'Retrieve address information based on Brazilian postal code (CEP).',
		inputSchema: {
			cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP must be in the format 00000-000 or 00000000')
		}
	},
	async ({ cep }) => {
		const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}/`);
		const address = response.data;

		return {
			content: [{
				type: 'text',
				text: `CEP: ${address.cep}\nState: ${address.state}\nCity: ${address.city}\nNeighborhood: ${address.neighborhood}\nStreet: ${address.street}\nCoordinates: ${address.coordinates.latitude}, ${address.coordinates.longitude}`
			}]
		};
	}
)

await server.connect(new StdioServerTransport());
console.log('MCP Server is running and listening for requests...');
