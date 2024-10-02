// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Model {
        string name;
        string description;
        uint256 price;
        address payable creator;
        uint8 rating;
        uint256 ratingCount;
    }
    event Log(string message);

    Model[] public models;
    mapping(address => mapping(uint256 => bool)) public purchasedModels;
    function purchaseModel(uint256 modelId) public payable {
        // Check that the model exists
        require(modelId < models.length, "Model does not exist.");

        // Get the model
        Model memory model = models[modelId];

        // Ensure the buyer has sent enough ether to purchase the model
        require(msg.value == model.price, "Incorrect payment amount.");

        // Ensure the buyer has not already purchased the model
        require(!purchasedModels[msg.sender][modelId], "Model already purchased.");

        // Transfer the payment to the model's creator
        model.creator.transfer(msg.value);

        // Mark the model as purchased by this buyer
        purchasedModels[msg.sender][modelId] = true;

        // Emit the event for the purchase
    }

    function getModels() public view returns (Model[] memory) {
        return models;
    }

    function listModel(string memory name, string memory description, uint256 price) public {
        models.push(Model({
            name: name,
            description: description,
            price: price,
            creator: payable(msg.sender),
            rating: 0,
            ratingCount: 0
        }));
        emit Log("Model was pushed");
    }

    function rateModel(uint256 modelId, uint8 rating) public {
        require(modelId < models.length, "Model does not exist.");
        Model storage model = models[modelId];

        model.rating += rating;
        model.ratingCount += 1;
        emit Log("Model was rated");
    }

    function withdrawFunds() public {
        payable(msg.sender).transfer(address(this).balance);
    }

    function getModelDetails(uint256 modelId) public view returns (Model memory) {
        require(modelId < models.length, "Model does not exist.");
        return models[modelId];
    }
    function getModelCount() public view returns (uint256) {
        return uint256(models.length);
    }
}