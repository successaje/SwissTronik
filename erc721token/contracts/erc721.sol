// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract FinisherNFT is ERC721, ERC721Burnable {

    constructor() ERC721("FinisherItem", "FNI"){}

    function mint(address to, uint256 tokenId) public
    {
        _safeMint(to, tokenId);
    }
}


cd contracts/perc20
touch IPERC20.sol
touch PERC20.sol
touch IPERC20Metadata.sol