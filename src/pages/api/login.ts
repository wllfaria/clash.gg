import { ApiLoginFactory } from '../../main/api/apiLoginFactory'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function LoginRoute(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	switch (req.method) {
		case 'POST': {
			const loginRouter = await ApiLoginFactory.make()
			const response = await loginRouter.route(req.body)
			return res.status(response.status).json(response)
		}
		default: {
			res.setHeader('Allow', ['POST'])
			res.end()
		}
	}
}
