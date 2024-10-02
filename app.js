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
const contractAddress = '0xFeEfBB6E73eD1e4b4944D9956c925460f35a3bd0';

// Function to connect to MetaMask

//const web3 = new Web3(window.ethereum);
const web3 = new Web3("http://127.0.0.1:7545");

const contract = new web3.eth.Contract(contractABI, contractAddress);
let account_l;
let account = "0xb548DcF1a56a5A960d1c98e9Cf9c54FeE7714390";

async function getAccountGanache() {
	try {
		await web3.eth.getAccounts().then((accounts) => {
			account_l = account;
			account = accounts[0]; // Use the first account
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
		const a = await contract.methods.listModel(name, description, price).send({"from": account, "gas": GAS});
		console.log(a);
		const message = await contract.methods.getModelCount().call();
		console.log(message);
    alert(`Model listed successfully`);
	} catch(error) {
		console.error('Error sending transaction:', error);
	}
}



// Initialize contract
async function init() {
    await getModels(); // Fetch and display models on load
}



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

    //document.getElementById('modelForm').reset();
    await getModels();
});

// Function to fetch models
async function getModels() {
    const modelList = document.getElementById('models');
    modelCount = await contract.methods.getModelCount().call();
    document.getElementById("counter").innerText = modelCount;
    modelList.innerHTML = '';

    for (let i = 0; i < modelCount; i++) {
        const model = await contract.methods.getModelDetails(i).call(); // Ensure you are passing 'i' as the index
        const listItem = document.createElement('li');
        listItem.textContent = `ID: ${i}, Name: ${model.name}, Description: ${model.description}, Price: ${model.price}`;
        modelList.appendChild(listItem);
    }
}
async function listModel(name, description, price) {
    const accounts = await web3.eth.getAccounts();
    
    // Call the listModel function and pass in the necessary parameters
    await contract.methods.listModel(name, description, price).send({
        "from": accounts[0], "gas": GAS
    })
    .on('transactionHash', function(hash) {
        console.log("Transaction Hash:", hash);
    })
    .on('receipt', function(receipt) {
        // Access the model ID from the event logs or use another method to retrieve it
        const modelId = receipt.events.ModelListed.returnValues.modelId;
        console.log("Model ID:", modelId);
    })
    .on('error', function(error) {
        console.error("Error:", error);
    });
}

// Function to purchase a model
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
        //const priceInWei = web3.utils.to(price, 'ether');
        await contract.methods.purchaseModel(modelId).send({
                      from: account, // The user's address
                      value: price  // Ether value in Wei
                  })
                  alert("Purchased model");
        // Call the payable function with the specified Ether value
        
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
    detailsDiv.innerHTML = `Name: ${modelDetails.name}, Description: ${modelDetails.description}, Price: ${modelDetails.price}, Creator: ${modelDetails.creator}, Average Rating: ${modelDetails.rating / modelDetails.ratingCount}`;
});

// Function to withdraw funds
document.getElementById('withdrawButton').addEventListener('click', async () => {
    const modelId = document.getElementById('withdrawModelId').value;
    console.log("Withdraw");
    await contract.methods.withdrawFunds(modelId).send({ from: account });
    alert("Withdrawn");
});

// Initialize the app
init();