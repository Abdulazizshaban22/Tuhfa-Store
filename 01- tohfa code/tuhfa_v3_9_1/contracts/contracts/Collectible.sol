// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Collectible is ERC721URIStorage, Ownable {
    uint256 private _nextId = 1;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {}

    function mintTo(address to, string memory tokenURI_) public onlyOwner returns (uint256) {
        uint256 id = _nextId++;
        _safeMint(to, id);
        _setTokenURI(id, tokenURI_);
        return id;
    }
}
