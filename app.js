// Check for MetaMask installation
// if (window.ethereum) {
// 	window.web3 = new Web3(window.ethereum);
// 	// Request account access if needed
// 	ethereum.request({ method: 'eth_requestAccounts' });
// } else if (window.web3) {
// 	window.web3 = new Web3(window.web3.currentProvider);  // Use Mist/MetaMask's provider
// } else {
// 	console.log('No Ethereum browser detected. You should consider trying MetaMask!');
// }


const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Log",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "models",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "rating",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "ratingCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "purchasedModels",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "modelId",
        "type": "uint256"
      }
    ],
    "name": "purchaseModel",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getModels",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "rating",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "ratingCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Marketplace.Model[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "listModel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "modelId",
        "type": "uint256"
      },
      {
        "internalType": "uint8",
        "name": "rating",
        "type": "uint8"
      }
    ],
    "name": "rateModel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "modelId",
        "type": "uint256"
      }
    ],
    "name": "getModelDetails",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "price",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "rating",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "ratingCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Marketplace.Model",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "getModelCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
];
const contractAddress = '0x287Fa05461bd002E38D028707dfa25B2eF7091e9';

// Function to connect to MetaMask

//const web3 = new Web3(window.ethereum);
const web3 = new Web3("http://127.0.0.1:7545");

const contract = new web3.eth.Contract(contractABI, contractAddress);
let account_l;
let account;
//let account = "0x236F9913B129BbeD0f3Fdf1324d50DD7bDd66B99";

async function getAccountGanache() {
	try {
		await web3.eth.getAccounts().then((accounts) => {
			account_l = account;
			account = accounts[0];
			console.log(account);
		});
	} catch (error) {
		console.error(error);
	}
}
getAccountGanache();
const GAS = 200000;
async function listModelTest(name, description, price) {
  name = ""+name+"";
  description = ""+description+"";
  price = parseInt(price, 10);
  console.log(name, description, price);
	try {
		await contract.methods.listModel(name, description, price).send({"from": account, "gas": GAS});
	} catch(error) {
		console.error('Error sending transaction:', error);
	}
}



async function init() {
    await getModels();
}
init();


// Function to list a new AI model
document.getElementById('modelForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const modelName = document.getElementById('modelName').value;
    const modelDescription = document.getElementById('modelDescription').value;
    const modelPrice = document.getElementById('modelPrice').value;
    console.log(modelName);
    console.log(modelDescription);
    console.log(modelPrice);

    await listModelTest(modelName, modelDescription, modelPrice);

    document.getElementById('modelForm').reset();
    await getModels();
});

async function getModels() {
    const modelList = document.getElementById('models');
    modelCount = await contract.methods.getModelCount().call();
    document.getElementById("counter").innerText = modelCount;
    modelList.innerHTML = '';

    for (let i = 0; i < modelCount; i++) {
        const model = await contract.methods.getModelDetails(i).call();
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${i}, Name: ${model.name}, Description: ${model.description}, Price: ${model.price}`;
        modelList.appendChild(listItem);
    }
}
async function listModel(name, description, price) {
    const accounts = await web3.eth.getAccounts();
    
    await contract.methods.listModel(name, description, price).send({
        "from": accounts[0], "gas": GAS
    })
    .on('transactionHash', function(hash) {
        console.log("Transaction Hash:", hash);
    })
    .on('receipt', function(receipt) {
        const modelId = receipt.events.ModelListed.returnValues.modelId;
        console.log("Model ID:", modelId);
    })
    .on('error', function(error) {
        console.error("Error:", error);
    });
}

document.getElementById('purchaseButton').addEventListener('click', async () => {
    var modelId = document.getElementById('purchaseModelId').value;
    modelId = parseInt(modelId, 10);
    console.log("Purchased");

    const model = await contract.methods.models(modelId).call();
    await purchaseModel(modelId);
    console.log("Purchased");
});
async function purchaseModel(modelId) {
    try {
		    const model = await contract.methods.getModelDetails(modelId).call(); 
        console.log(model.price);
        const price = parseInt(model.price, 10);
        await contract.methods.purchaseModel(modelId).send({
                      from: account, 
                      value: price 
                  })
                  alert("Purchased model");
        
    } catch (error) {
        console.error("Error purchasing model:", error);
    }
}

// Function to rate a model
document.getElementById('rateButton').addEventListener('click', async () => {
    const modelId = parseInt(document.getElementById('rateModelId').value, 10);
    const rating = parseInt(document.getElementById('modelRating').value, 10);
    console.log("Rated");

    await contract.methods.rateModel(modelId, rating).send({ from: account });
});

// Function to view model details
document.getElementById('viewButton').addEventListener('click', async () => {
    const modelId = parseInt(document.getElementById('viewModelId').value, 10);
    const modelDetails = await contract.methods.getModelDetails(modelId).call();
    
    const detailsDiv = document.getElementById('modelDetails');
    var rating = 0;
    if (modelDetails.ratingCount == 0) {
      rating = 0;
    } else {
      rating = modelDetails.rating / modelDetails.ratingCount;
    }
    detailsDiv.innerHTML = `Name: ${modelDetails.name}, Description: ${modelDetails.description}, Price: ${modelDetails.price}, Creator: ${modelDetails.creator}, Average Rating: ${rating}`;
});

// Function to withdraw funds
document.getElementById('withdrawButton').addEventListener('click', async () => {
    const modelId = document.getElementById('withdrawModelId').value;
    console.log("Withdraw");
    await contract.methods.withdrawFunds(modelId).send({ from: account });
    alert("Withdrawn");
});