// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
// import "./IPERC20.sol";
// import "./IPERC20Metadata.sol";

contract FinisherNFT is ERC721, ERC721Burnable {

    constructor() ERC721("FinisherItem", "FNI"){}

    /// @dev Wraps FNI to PFNI.
    receive() external payable {
        _mint(_msgSender(), msg.value);
    }




    function mint(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }

    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not token owner or approved for all"
        );

        _approve(to, tokenId);
    }

}

