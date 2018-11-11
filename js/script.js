window.addEventListener('load', async () => {
  const web3 = await initWeb3(window)

  const wallet = new Wallet(web3)
  window.wallet = wallet

  const tokenAddress = "0xD1128c7fc833A420772169dF922b8B1bE0455f4f"

  const noxonToken = new Token(web3, tokenAddress)
  await wallet.addToken(noxonToken)

  $('.token_balance').attr("href", "https://rinkeby.etherscan.io/address/" + tokenAddress)

  window.buyStarterPack = async () => {
    const { current_load, promised_load, percent } = updateOrderForm()

    console.log(`Deploy contract with params ${current_load}, ${promised_load}, ${percent}`)

    showLoader('pay-button')

    const tokenAddress = noxonToken.address
    const endTime = Math.floor(Date.now() / 1000) + 3 * 60
    const updateTime = 60
    const curload = current_load

    const customer = wallet.account.address
    const schneider = "0xBEabEcdd11D7E239FEaaB28E1A5b86be95a5F41f"

    const params = [
      tokenAddress,
      endTime,
      updateTime,
      curload,
      customer,
      schneider,
    ]

    const config = {
      from: wallet.account.address,
      data: _SchneiderBIN,
      value: 2e17,
    }

    const schneider_contract = await Contract.deploy(web3, _SchneiderABI, config, ...params)

    const token = noxonToken
    const decimals = await token.getDecimals()
    const value = "300000000000000000000000" // 300 000 * 1e18
    const amount = value
    await token.transfer(wallet.account.address, schneider_contract.address, amount)
    // await token.transfer(wallet.account.address, "0x17da6a8b86578cec4525945a355e8384025fa5af", amount)

    hideLoader('pay-button')
  }

  window.updateBalance = async () => {
    const wei = await wallet.getBalance()
    const balance = web3.utils.fromWei(wei)

    const tokenBalance = await wallet.getTokenBalance(noxonToken)

    console.log(`updateBalance() ---> Balance: ${Number(balance).toFixed(3)}`)
    console.log(`updateBalance() ---> NOXON Balance: ${Number(tokenBalance).toFixed(3)}`)

    const noxonTokenName = await noxonToken.getSymbol()

    $('.token_balance').text( Number(tokenBalance).toFixed(2) + ' ' + noxonTokenName)

    return true
  }

  window.updateBalance()
});
