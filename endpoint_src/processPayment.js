'use strict';

var ApiContracts = require('authorizenet').APIContracts;
var ApiControllers = require('authorizenet').APIControllers;
var SDKConstants = require('authorizenet').Constants;


var constants = require('../constants.js');
const { rejects } = require('assert');


function createAnAcceptPaymentTransaction(nonce, amount, orderDetails) {
    return new Promise((resolve, reject) => {
        var merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(constants.apiLoginKey);
        merchantAuthenticationType.setTransactionKey(constants.transactionKey);
        
        var opaqueData = new ApiContracts.OpaqueDataType();
        opaqueData.setDataDescriptor('COMMON.ACCEPT.INAPP.PAYMENT');
        opaqueData.setDataValue(nonce);
        // '119eyJjb2RlIjoiNTBfMl8wNjAwMDUyN0JEODE4RjQxOUEyRjhGQkIxMkY0MzdGQjAxQUIwRTY2NjhFNEFCN0VENzE4NTUwMjlGRUU0M0JFMENERUIwQzM2M0ExOUEwMDAzNzlGRDNFMjBCODJEMDFCQjkyNEJDIiwidG9rZW4iOiI5NDkwMjMyMTAyOTQwOTk5NDA0NjAzIiwidiI6IjEuMSJ9'
        var paymentType = new ApiContracts.PaymentType();
        paymentType.setOpaqueData(opaqueData);


        var transactionRequestType = new ApiContracts.TransactionRequestType();
        transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequestType.setPayment(paymentType);
        transactionRequestType.setAmount(amount);
        // transactionRequestType.setLineItems(lineItems);
        // transactionRequestType.setUserFields(userFields);
        if (orderDetails) {
            transactionRequestType.setOrder(orderDetails);
        }
        // transactionRequestType.setTax(tax);
        // transactionRequestType.setDuty(duty);
        // transactionRequestType.setShipping(shipping);
        // transactionRequestType.setBillTo(billTo);
        // transactionRequestType.setShipTo(shipTo);
        // transactionRequestType.setTransactionSettings(transactionSettings);

        var createRequest = new ApiContracts.CreateTransactionRequest();
        createRequest.setMerchantAuthentication(merchantAuthenticationType);
        createRequest.setTransactionRequest(transactionRequestType);

            //pretty print request
        //console.log(JSON.stringify(createRequest.getJSON(), null, 2));
            
        var ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

        ctrl.execute(function(){

            var apiResponse = ctrl.getResponse();

            var response = new ApiContracts.CreateTransactionResponse(apiResponse);

            //pretty print response
            //console.log(JSON.stringify(response, null, 2));

            if(response != null){
                if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
                    if(response.getTransactionResponse().getMessages() != null){
                        resolve({
                            transId: response.getTransactionResponse().getTransId()
                            , respCode: response.getTransactionResponse().getResponseCode()
                            , msgCode: response.getTransactionResponse().getMessages().getMessage()[0].getCode()
                            , Description: response.getTransactionResponse().getMessages().getMessage()[0].getDescription()
                        });
                    }
                    else {
                        reject(response.getTransactionResponse().getErrors());
                    }
                }
                else {
                    if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
                        reject(response.getTransactionResponse().getErrors());
                    } else {
                        reject(response.getMessages().getMessage()[0])
                    }
                }
            }
            else {
                reject('Null response');
            }
            
        });
    });
}

if (require.main === module) {
	createAnAcceptPaymentTransaction(function(){
		console.log('createAnAcceptPaymentTransaction call complete.');
	});
}

module.exports.createAnAcceptPaymentTransaction = createAnAcceptPaymentTransaction;