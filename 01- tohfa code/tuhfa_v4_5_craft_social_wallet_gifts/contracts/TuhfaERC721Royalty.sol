
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Scaffold for ERC-721 with EIP-2981 royalties.
 * Replace imports with OpenZeppelin in a proper Hardhat/Foundry project.
 */
interface IERC165 { function supportsInterface(bytes4 interfaceId) external view returns (bool); }
interface IERC721 { /* ... */ }
interface IERC2981 {
  function royaltyInfo(uint256 _tokenId, uint256 _salePrice) external view returns (address receiver, uint256 royaltyAmount);
}

contract TuhfaERC721Royalty /* is ERC721, ERC2981 */ {
  string public name = "Tuhfa Collectibles";
  string public symbol = "TUHFA";
  uint96 internal _royaltyBps = 500; // 5%
  address internal _royaltyReceiver;

  constructor(address receiver, uint96 bps){ _royaltyReceiver = receiver; _royaltyBps = bps; }

  function royaltyInfo(uint256, uint256 salePrice) external view returns (address, uint256) {
    return (_royaltyReceiver, salePrice * _royaltyBps / 10000);
  }
}
