// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/access/Ownable.sol";
contract TohfaRegistry is Ownable {
    // tagHash => (contract, tokenId)
    mapping(bytes32 => mapping(address => uint256)) public tagToToken;
    event Linked(bytes32 indexed tagHash, address indexed nft, uint256 indexed tokenId);
    function link(bytes32 tagHash, address nft, uint256 tokenId) external onlyOwner {
        tagToToken[tagHash][nft] = tokenId;
        emit Linked(tagHash, nft, tokenId);
    }
}
