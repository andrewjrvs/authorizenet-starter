var ApiContracts = require('authorizenet').APIContracts;

function createPaymentDetails(reqObject) {
    let orderDetails = null
    ;

    orderDetails = new ApiContracts.OrderType();
    orderDetails.setInvoiceNumber('INV-' + require('crypto').randomBytes(4).toString('hex'));
    orderDetails.setDescription('authorizenet-starter payment');

    return [orderDetails]
}


if (require.main === module) {
	createPaymentDetails(function(){
		console.log('createAnAcceptPaymentTransaction call complete.');
	});
}

module.exports.createPaymentDetails = createPaymentDetails;