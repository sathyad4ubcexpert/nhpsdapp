var abi;
var MyContract;
var care;

// window.addEventListener('load', function () {
// 2. Createa a new web3 provider and assing the provider (basically to which ethereum node you are connecting to)
// Checking if Web3 has been injected by the browser (Mist/MetaMask)
if (typeof web3 !== 'undefined') {
	// Use Mist/MetaMask's provider
	web3 = new Web3(web3.currentProvider);
} else {
	console.log('No web3? You should consider trying MetaMask!')
	// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
	web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/jusRhRm9lPsVCXFLnnNk"));
}

// 3. Create a contract object using ABI.
abi = [{
		"constant": false,
		"inputs": [{
				"name": "_claimID",
				"type": "uint64"
			},
			{
				"name": "_stateAddress",
				"type": "address"
			},
			{
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"name": "_providerAddress",
				"type": "address"
			},
			{
				"name": "_ICDs",
				"type": "uint64[]"
			}
		],
		"name": "addClaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "_newUserAddress",
			"type": "address"
		}],
		"name": "addDeskUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"name": "_patientAddress",
				"type": "address"
			},
			{
				"name": "_maxClaimAmount",
				"type": "uint64"
			},
			{
				"name": "_amountClaimed",
				"type": "uint64"
			},
			{
				"name": "_no",
				"type": "uint64"
			}
		],
		"name": "addPatient",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "_claimID",
			"type": "uint64"
		}],
		"name": "approveClaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"name": "addedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "PatientAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"name": "stateAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "claimID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "providerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "ClaimApproved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [{
				"indexed": true,
				"name": "stateAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "claimID",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "patientAddress",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "providerAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timeStamp",
				"type": "uint256"
			}
		],
		"name": "ClaimCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "_claimID",
			"type": "uint64"
		}],
		"name": "sendClaimForProcessing",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "_contractAddress",
			"type": "address"
		}],
		"name": "setContractAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
				"name": "_centralPercent",
				"type": "uint64"
			},
			{
				"name": "_satePercent",
				"type": "uint64"
			},
			{
				"name": "_maxClaim",
				"type": "uint64"
			}
		],
		"name": "setValues",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [{
			"name": "newOwner",
			"type": "address"
		}],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getCenterTotalShare",
		"outputs": [{
			"name": "",
			"type": "uint64"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"name": "_claimID",
			"type": "uint64"
		}],
		"name": "getClaimDetails",
		"outputs": [{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "address"
			},
			{
				"name": "",
				"type": "uint64[]"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"name": "_patientAddress",
			"type": "address"
		}],
		"name": "getPatientDetails",
		"outputs": [{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			},
			{
				"name": "",
				"type": "uint64"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [{
			"name": "_stateAddress",
			"type": "address"
		}],
		"name": "getSateTotalShare",
		"outputs": [{
			"name": "",
			"type": "uint64"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [{
			"name": "",
			"type": "address"
		}],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];
MyContract = web3.eth.contract(abi);
// 4. Get the deployed instance of that contract object.
care = MyContract.at('0x23ab66afbdb59e7cd4da68b1c4f554588b6e3764');
//window.addEventListener('load', function () {



//}); //end of window load


