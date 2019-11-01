var abi;
var MyContract;
var care;

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
window.addEventListener('load', function () {
    care.ClaimCreated({}, {
        fromBlock: 0,
        toBlock: 'latest'
    }).get((error, eventResult) => {
        if (error)
            console.log('Error in ClaimCreated event handler: ' + error);
        else {
            console.log('ClaimCreated indexed: ' + JSON.stringify(eventResult));

            var arrLength = eventResult.length;
            console.log(arrLength);            
            $('#tblCentral').DataTable({
                data: eventResult,
                "columns": [{
                        "data": "args.claimID"
                    },
                    {
                        "data": "args.stateAddress"
                    },
                    {
                        "data": "args.patientAddress"
                    },
                    {
                        "data": "args.providerAddress"
                    },
                    {
                        "data": "args.timeStamp"
                    }
                ],
                "columnDefs": [
                    {
                        "searchable": false,
                        "targets": 0,
                        "render": function (claimId) { 
                            var url =  '/claimdetails1.html?id='+claimId;
                                return '<a href='+url+'>'+claimId+'</a>'; 
                        }
                    },
                    {
                        "render": function (data) {
                            var stateName = data;                            
                            if(data === ("0x113cc38e12496386ee9ad77cdfb6004a013fbb2c").toLowerCase()){
                                stateName = "Telangana";
                            }else if(data === ("0x1542ef3ccf3f2b7e0bd251894ed276b9d795229b").toLowerCase()){
                                stateName = "AndhraPradesh";
                            }else if(data === ("0x5bde044d6a692adeff4f59569ad1fd436a88dcf8").toLowerCase()){
                                stateName = "Haryana";
                            }else if(data === ("0xAc68FE2B0EE0a58c2c2fFa3876432da2F10a8D73").toLowerCase()){
                                stateName = "UttarPradesh";
                            }else if(data === ("0xf9C48Da14B126878ACb394BD77A1428D7Cf07235").toLowerCase()){
                                stateName = "Gujarat";
                            }else if(data === ("0x43D79D4c31EB231F6dc28FD321c5197D3E3D0A10").toLowerCase()){
                                stateName = "Delhi";                                
                            }
                            return stateName;
                        },
                        "targets": 1
                    },
                    {
                        "searchable": false,
                        "targets": 2
                    },{
                        "searchable": false,
                        "targets": 3
                    },{
                        "searchable": false,
                        "render": function (data, type, row) {
                            var newDate = new Date(data * 1000);
                            var dateStr = newDate.getDate() + '-' + newDate.getMonth() +
                                '-' + newDate.getFullYear();
                            return dateStr;

                        },
                        "targets": 4
                    }
                ]

            });				
            
            //get central total share
            var claim = care.getCenterTotalShare({
                from: web3.eth.accounts[0]
            }, function (err, result) {
                if (!err) {
                    console.log("details for claimid  is :" + result);
                    $("#lblCentralShare").html(result.c[0]);
                } else {
                     console.error(err);
                }				
            }); 
            //end of central share
        }
    });
}); //end of window load

//getting data to central page
/**
 * to get total central share value
 * to get table data of patients to central page
 */


//getting data to state page
/**
 * display data according to state in table
 * to get total state share value
 */


//getting patientpage details
/**
 * calling already defined getpatientdetails() method and displaying data
 * expected claimid,providerAddress,status and date
 * with status approve means call approveClaim() in blockchain
 */

 