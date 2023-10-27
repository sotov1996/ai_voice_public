const stripeController = require("../services/stripeServices")

const createCheckoutSession = async (_, res) => {
	try {
		const session = await stripeController.createCheckoutSession()
		return res.status(200).send({
			session_url: session.url,
			session_id: session.id,
		})
	} catch (e) {
		return res.send(500)
	}
}

module.exports = {
  createCheckoutSession
}