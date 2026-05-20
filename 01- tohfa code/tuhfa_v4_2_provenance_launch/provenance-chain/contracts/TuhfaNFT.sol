// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title TuhfaNFT — ERC721 for physical/heritage items provenance.
 * @dev Uses ERC721URIStorage to store tokenURI pointing to JSON-LD metadata (IPFS or HTTPS).
 * On-chain events + off-chain XMP (KHR_xmp_json_ld) give a dual provenance.
 */
contract TuhfaNFT is ERC721URIStorage, Ownable {
    uint256 private _nextId = 1;
    string public baseURI;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);
    event UpdatedTokenURI(uint256 indexed tokenId, string tokenURI);

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable(msg.sender) {}

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string calldata newBase) external onlyOwner {
        baseURI = newBase;
    }

    function mintTo(address to, string calldata tokenUri) external onlyOwner returns (uint256) {
        uint256 id = _nextId++;
        _safeMint(to, id);
        _setTokenURI(id, tokenUri);
        emit Minted(to, id, tokenUri);
        return id;
    }

    function updateTokenURI(uint256 tokenId, string calldata tokenUri) external onlyOwner {
        _setTokenURI(tokenId, tokenUri);
        emit UpdatedTokenURI(tokenId, tokenUri);
    }
}