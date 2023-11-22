const stripeController = require("../services/stripeServices")

const createCheckoutSession = async (_, res) => {
	try {
		const session = await stripeController.createCheckoutSession()
		return res.status(200).json({
			session_url: session.url,
			session_id: session.id,
		})
	} catch (e) {
		return res.status(500).send("createCheckoutSession error")
	}
}

module.exports = {
  createCheckoutSession
}