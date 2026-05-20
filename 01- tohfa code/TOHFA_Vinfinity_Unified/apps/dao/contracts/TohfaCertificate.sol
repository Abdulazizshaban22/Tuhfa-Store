// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TohfaCertificate is ERC721URIStorage, Ownable {
    uint256 public nextId = 1;
    constructor() ERC721("Tohfa Certificate", "TOHFA") Ownable(msg.sender) {}
    function safeMint(address to, string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = nextId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        return tokenId;
    }
}
