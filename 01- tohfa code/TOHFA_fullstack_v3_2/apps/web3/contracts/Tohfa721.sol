// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract Tohfa721 is ERC721URIStorage, Ownable {
    uint256 public nextId = 1;
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}
    function safeMint(address to, string memory tokenURI_) external onlyOwner returns (uint256) {
        uint256 tokenId = nextId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);
        return tokenId;
    }
}
